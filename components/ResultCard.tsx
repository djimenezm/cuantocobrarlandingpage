'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { assessLandingOffer, type CalculationResult } from '@/lib/calculator';
import { formatCurrency, formatNumber } from '@/lib/format';
import { parseSpanishNumber } from '@/lib/spanishNumber';

type ResultCardProps = {
  result: CalculationResult;
  hasIVA: boolean;
};

type CopyStatus = 'idle' | 'copied' | 'error';

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand('copy');
  document.body.removeChild(textArea);

  if (!copied) {
    throw new Error('No se pudo copiar el resumen.');
  }
}

export default function ResultCard({ result, hasIVA }: ResultCardProps) {
  const resultCardRef = useRef<HTMLElement>(null);
  const lastTrackedPrice = useRef<number | null>(null);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const [clientPrice, setClientPrice] = useState('');
  const parsedClientPrice = parseSpanishNumber(clientPrice);
  const hasClientPrice = clientPrice.trim() !== '';
  const clientPriceIsValid = Number.isFinite(parsedClientPrice) && parsedClientPrice >= 0;
  const offerAssessment = hasClientPrice && clientPriceIsValid
    ? assessLandingOffer(result, parsedClientPrice)
    : null;
  const hoursToTrim = offerAssessment?.hoursToTrim.toLocaleString('es-ES', {
    maximumFractionDigits: 2,
  });
  const pricingBuffer = Math.max(0, result.recommendedLandingPrice - result.minimumLandingPrice);
  const landingSummary = [
    'Resumen de landing page',
    `Precio mínimo defendible: ${formatCurrency(result.minimumLandingPrice)} sin IVA`,
    `Precio recomendado: ${formatCurrency(result.recommendedLandingPrice)} sin IVA`,
    hasIVA
      ? `Total final con IVA: ${formatCurrency(result.totalWithVAT)}`
      : 'IVA: no añadido en esta simulación',
    `Alcance estimado: ${result.sections} secciones, ${result.integrationsCount} integraciones y ${result.revisionRounds} rondas de revisión`,
    `Copywriting: ${result.includeCopywriting ? 'incluido' : 'lo aporta el cliente'}`,
    `Horas base estimadas: ${formatNumber(result.estimatedProjectHours, 2)} h`,
    `Horas con buffer: ${formatNumber(result.bufferedProjectHours, 2)} h`,
    `Buffer de contingencia: ${formatNumber(result.contingencyBufferPercent, 2)}%`,
    `Referencia base: ${formatCurrency(result.baseHourlyRate)}/h`,
    `Tarifa efectiva del proyecto: ${formatCurrency(result.effectiveHourlyRate)}/h`,
    `Costes directos: ${formatCurrency(result.directProjectCosts)}`,
    `Colchón de negociación: ${formatCurrency(pricingBuffer)}`,
    ...(offerAssessment
      ? [
          `Precio propuesto por el cliente: ${formatCurrency(offerAssessment.offeredPrice)} sin IVA`,
          `Diferencia frente al mínimo: ${formatCurrency(offerAssessment.gapToFloor)}`,
        ]
      : []),
    'Nota: si el cliente pide bajar precio, conviene ajustar alcance, revisiones o integraciones antes de bajar del mínimo defendible.',
  ].join('\n');

  const trackOfferComparison = useCallback(() => {
    if (!offerAssessment || lastTrackedPrice.current === parsedClientPrice) return;

    lastTrackedPrice.current = parsedClientPrice;
    const outcome = offerAssessment.directCostsUncovered
      ? 'below_costs'
      : offerAssessment.gapToFloor < 0
        ? 'below_floor'
        : offerAssessment.gapToRecommended < 0
          ? 'below_recommended'
          : 'meets_recommended';
    void import('@vercel/analytics')
      .then(({ track }) => track('landing_offer_compared', { outcome }))
      .catch(() => undefined);
  }, [offerAssessment, parsedClientPrice]);

  useEffect(() => {
    if (!offerAssessment || lastTrackedPrice.current === parsedClientPrice) return;

    const timeout = window.setTimeout(trackOfferComparison, 800);
    return () => window.clearTimeout(timeout);
  }, [offerAssessment, parsedClientPrice, trackOfferComparison]);

  async function handleCopySummary() {
    try {
      await copyTextToClipboard(landingSummary);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2500);
    } catch {
      setCopyStatus('error');
    }
  }

  useEffect(() => {
    resultCardRef.current?.focus();
  }, []);

  return (
    <section ref={resultCardRef} className="result-card" tabIndex={-1} aria-live="polite">
      <h3>Tu precio recomendado para esta landing page</h3>

      <p className="result-lead">
        Con esta simulación, una propuesta razonable quedaría en{' '}
        <strong>{formatCurrency(result.recommendedLandingPrice)}</strong> sin IVA. Tu suelo para no
        quedarte corto con este alcance estaría alrededor de{' '}
        <strong>{formatCurrency(result.minimumLandingPrice)}</strong>, así que la diferencia entre
        ambas cifras es el aire real que te das para negociar sin comerte el margen.
      </p>

      <div className="result-grid">
        <div className="result-item">
          <span>Referencia base por hora</span>
          <strong>{formatCurrency(result.baseHourlyRate)}/h</strong>
        </div>

        <div className="result-item">
          <span>Horas estimadas con buffer</span>
          <strong>{formatNumber(result.bufferedProjectHours, 2)} h</strong>
        </div>

        <div className="result-item">
          <span>Costes directos del proyecto</span>
          <strong>{formatCurrency(result.directProjectCosts)}</strong>
        </div>

        <div className="result-item">
          <span>Precio mínimo defendible</span>
          <strong>{formatCurrency(result.minimumLandingPrice)}</strong>
        </div>

        <div className="result-item">
          <span>Precio recomendado sin IVA</span>
          <strong>{formatCurrency(result.recommendedLandingPrice)}</strong>
        </div>

        <div className="result-item">
          <span>Colchón entre mínimo y recomendado</span>
          <strong>{formatCurrency(pricingBuffer)}</strong>
        </div>

        <div className="result-item result-item-full">
          <span>Total final con IVA</span>
          <strong>{formatCurrency(result.totalWithVAT)}</strong>
        </div>
      </div>

      <div className="price-check">
        <label htmlFor="landing-client-price">¿Qué presupuesto tiene el cliente? (sin IVA)</label>
        <input
          id="landing-client-price"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={clientPrice}
          onChange={(event) => setClientPrice(event.target.value)}
          onBlur={trackOfferComparison}
          aria-invalid={hasClientPrice && !clientPriceIsValid}
          aria-describedby={
            hasClientPrice && !clientPriceIsValid ? 'landing-client-price-error' : undefined
          }
          placeholder="Ej. 900"
        />
        {hasClientPrice && !clientPriceIsValid && (
          <p id="landing-client-price-error" className="field-error" role="alert">
            Escribe un importe válido de 0 o más.
          </p>
        )}
        {offerAssessment && (
          <p className="price-check-result" role="status">
            {offerAssessment.directCostsUncovered ? (
              <>Ese presupuesto ni siquiera cubre los costes directos de la landing.</>
            ) : offerAssessment.gapToFloor < 0 ? (
              <>
                Faltan <strong>{formatCurrency(-offerAssessment.gapToFloor)}</strong> para cubrir
                tu mínimo. Tendrías que recortar aproximadamente <strong>{hoursToTrim} h</strong>{' '}
                del alcance con buffer: revisa secciones, integraciones, copy o revisiones.
              </>
            ) : offerAssessment.gapToRecommended < 0 ? (
              <>
                Cubre tu mínimo, pero queda a{' '}
                <strong>{formatCurrency(-offerAssessment.gapToRecommended)}</strong> del margen
                que habías previsto.
              </>
            ) : (
              <>
                Cubre tu mínimo y el margen previsto. Supera tu recomendación en{' '}
                <strong>{formatCurrency(offerAssessment.gapToRecommended)}</strong>.
              </>
            )}
          </p>
        )}
      </div>

      <div className="result-next-step">
        <strong>Lectura rápida para defender el precio</strong>
        <p>
          Si el cliente te aprieta, toma <strong>{formatCurrency(result.minimumLandingPrice)}</strong>{' '}
          como referencia de suelo: por debajo de esa cifra empiezas a absorber tú el margen, los
          imprevistos o parte del tiempo real del proyecto. La zona cómoda para presentar propuesta
          está más cerca de <strong>{formatCurrency(result.recommendedLandingPrice)}</strong>.
        </p>
      </div>

      <div className="result-copy-box">
        <div className="result-copy-header">
          <div>
            <strong>Resumen listo para guardar</strong>
            <p>
              Copia una versión corta del cálculo para usarla como nota de propuesta, alcance o
              defensa rápida del precio.
            </p>
          </div>
          <button type="button" className="result-copy-button" onClick={handleCopySummary}>
            {copyStatus === 'copied' ? 'Resumen copiado' : 'Copiar resumen'}
          </button>
        </div>
        <pre className="result-copy-preview">{landingSummary}</pre>
        {copyStatus === 'copied' && (
          <span className="result-copy-status" role="status">
            Resumen copiado.
          </span>
        )}
        {copyStatus === 'error' && (
          <span className="result-copy-status result-copy-status-error" role="status">
            No se ha podido copiar automáticamente. Puedes seleccionar el resumen manualmente.
          </span>
        )}
      </div>

      <p className="result-summary">
        Para sostener un objetivo mensual de <strong>{formatCurrency(result.targetMonthlyNet)}</strong>
        , con unos costes fijos de <strong>{formatCurrency(result.monthlyFixedCosts)}</strong> y{' '}
        <strong>{formatNumber(result.billableHoursPerMonth, 2)}</strong> horas facturables al mes, tu referencia
        mensual se sitúa en <strong>{formatCurrency(result.monthlyRevenueTarget)}</strong> antes de
        repartirla entre proyectos.
      </p>

      <p className="result-summary">
        En esta landing page hemos estimado <strong>{formatNumber(result.estimatedProjectHours, 2)} horas base</strong>{' '}
        entre discovery, secciones, integraciones, revisiones y QA. Con un buffer del{' '}
        <strong>{formatNumber(result.contingencyBufferPercent, 2)}%</strong>, la estimación sube a{' '}
        <strong>{formatNumber(result.bufferedProjectHours, 2)} horas</strong> razonables para presupuestar sin
        improvisar.
      </p>

      <p className="result-summary">
        Además, has dejado una reserva fiscal orientativa del{' '}
        <strong>{formatNumber(result.taxReservePercent, 2)}%</strong> y un margen extra del{' '}
        <strong>{formatNumber(result.profitMarginPercent, 2)}%</strong>. Eso sitúa el proyecto en una referencia
        efectiva de <strong>{formatCurrency(result.effectiveHourlyRate)}/h</strong> sobre las horas
        ya amortiguadas por buffer, con un colchón adicional de{' '}
        <strong>{formatCurrency(pricingBuffer)}</strong> frente al mínimo.
        {hasIVA ? (
          <>
            {' '}
            Si repercutes IVA, tendrías que añadir aproximadamente{' '}
            <strong>{formatCurrency(result.vatAmount)}</strong>, dejando la propuesta final en{' '}
            <strong>{formatCurrency(result.totalWithVAT)}</strong>.
          </>
        ) : (
          <> En esta simulación no se añade IVA al total.</>
        )}
      </p>

      <div className="result-next-step">
        <strong>Siguiente paso recomendado</strong>
        <p>
          Usa la cifra recomendada como base para presentar un presupuesto cerrado. Si el cliente
          aprieta precio, intenta primero tocar alcance, revisiones o integraciones: bajar por
          debajo del mínimo defendible significa asumir tu parte del coste del proyecto.
        </p>
      </div>
    </section>
  );
}
