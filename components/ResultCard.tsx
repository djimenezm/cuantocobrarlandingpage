import { CalculationResult } from '@/lib/calculator';
import { formatCurrency } from '@/lib/format';

type ResultCardProps = {
  result: CalculationResult;
  hasIVA: boolean;
};

export default function ResultCard({ result, hasIVA }: ResultCardProps) {
  const pricingBuffer = Math.max(0, result.recommendedLandingPrice - result.minimumLandingPrice);

  return (
    <section className="result-card" aria-live="polite">
      <h3>Tu precio recomendado para esta landing page</h3>

      <p className="result-lead">
        Con esta simulacion, una propuesta razonable quedaria en{' '}
        <strong>{formatCurrency(result.recommendedLandingPrice)}</strong> sin IVA. Tu suelo para no
        quedarte corto con este alcance estaria alrededor de{' '}
        <strong>{formatCurrency(result.minimumLandingPrice)}</strong>, asi que la diferencia entre
        ambas cifras es el aire real que te das para negociar sin comerte el margen.
      </p>

      <div className="result-grid">
        <div className="result-item">
          <span>Referencia base por hora</span>
          <strong>{formatCurrency(result.baseHourlyRate)}/h</strong>
        </div>

        <div className="result-item">
          <span>Horas estimadas con buffer</span>
          <strong>{result.bufferedProjectHours} h</strong>
        </div>

        <div className="result-item">
          <span>Costes directos del proyecto</span>
          <strong>{formatCurrency(result.directProjectCosts)}</strong>
        </div>

        <div className="result-item">
          <span>Precio minimo defendible</span>
          <strong>{formatCurrency(result.minimumLandingPrice)}</strong>
        </div>

        <div className="result-item">
          <span>Precio recomendado sin IVA</span>
          <strong>{formatCurrency(result.recommendedLandingPrice)}</strong>
        </div>

        <div className="result-item">
          <span>Colchon entre minimo y recomendado</span>
          <strong>{formatCurrency(pricingBuffer)}</strong>
        </div>

        <div className="result-item result-item-full">
          <span>Total final con IVA</span>
          <strong>{formatCurrency(result.totalWithVAT)}</strong>
        </div>
      </div>

      <div className="result-next-step">
        <strong>Lectura rapida para defender el precio</strong>
        <p>
          Si el cliente te aprieta, toma <strong>{formatCurrency(result.minimumLandingPrice)}</strong>{' '}
          como referencia de suelo: por debajo de esa cifra empiezas a absorber tu el margen, los
          imprevistos o parte del tiempo real del proyecto. La zona comoda para presentar propuesta
          esta mas cerca de <strong>{formatCurrency(result.recommendedLandingPrice)}</strong>.
        </p>
      </div>

      <p className="result-summary">
        Para sostener un objetivo mensual de <strong>{formatCurrency(result.targetMonthlyNet)}</strong>
        , con unos costes fijos de <strong>{formatCurrency(result.monthlyFixedCosts)}</strong> y{' '}
        <strong>{result.billableHoursPerMonth}</strong> horas facturables al mes, tu referencia
        mensual se situa en <strong>{formatCurrency(result.monthlyRevenueTarget)}</strong> antes de
        repartirla entre proyectos.
      </p>

      <p className="result-summary">
        En esta landing page hemos estimado <strong>{result.estimatedProjectHours} horas base</strong>{' '}
        entre discovery, secciones, integraciones, revisiones y QA. Con un buffer del{' '}
        <strong>{result.contingencyBufferPercent}%</strong>, la estimacion sube a{' '}
        <strong>{result.bufferedProjectHours} horas</strong> razonables para presupuestar sin
        improvisar.
      </p>

      <p className="result-summary">
        Ademas, has dejado una reserva fiscal orientativa del{' '}
        <strong>{result.taxReservePercent}%</strong> y un margen extra del{' '}
        <strong>{result.profitMarginPercent}%</strong>. Eso situa el proyecto en una referencia
        efectiva de <strong>{formatCurrency(result.effectiveHourlyRate)}/h</strong> sobre las horas
        ya amortiguadas por buffer, con un colchon adicional de{' '}
        <strong>{formatCurrency(pricingBuffer)}</strong> frente al minimo.
        {hasIVA ? (
          <>
            {' '}
            Si repercutes IVA, tendrias que anadir aproximadamente{' '}
            <strong>{formatCurrency(result.vatAmount)}</strong>, dejando la propuesta final en{' '}
            <strong>{formatCurrency(result.totalWithVAT)}</strong>.
          </>
        ) : (
          <> En esta simulacion no se anade IVA al total.</>
        )}
      </p>

      <div className="result-next-step">
        <strong>Siguiente paso recomendado</strong>
        <p>
          Usa la cifra recomendada como base para presentar un presupuesto cerrado. Si el cliente
          aprieta precio, intenta primero tocar alcance, revisiones o integraciones: bajar por
          debajo del minimo defendible significa asumir tu parte del coste del proyecto.
        </p>
      </div>
    </section>
  );
}
