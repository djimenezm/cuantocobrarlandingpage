'use client';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';
import { calculateLandingPageQuote } from '@/lib/calculator';

const ResultCard = dynamic(() => import('@/components/ResultCard'), {
  loading: () => (
    <p className="form-note" role="status">
      Preparando el resumen del presupuesto...
    </p>
  ),
});

type FieldName =
  | 'targetMonthlyNet'
  | 'monthlyFixedCosts'
  | 'billableHoursPerMonth'
  | 'sections'
  | 'integrationsCount'
  | 'revisionRounds'
  | 'directProjectCosts'
  | 'contingencyBufferPercent'
  | 'taxReservePercent'
  | 'profitMarginPercent';

type FormErrors = Partial<Record<FieldName, string>>;

function parseNumericValue(value: string) {
  const normalizedValue = value.replace(',', '.').trim();

  if (normalizedValue === '') {
    return Number.NaN;
  }

  return Number(normalizedValue);
}

function formatNormalizedNumber(value: number, maximumFractionDigits = 2) {
  return value.toLocaleString('en-US', {
    useGrouping: false,
    maximumFractionDigits,
  });
}

function normalizeFieldValue(field: FieldName, value: string) {
  const parsedValue = parseNumericValue(value);

  if (!Number.isFinite(parsedValue)) {
    return value.trim() === '' ? '' : value;
  }

  switch (field) {
    case 'targetMonthlyNet':
    case 'monthlyFixedCosts':
    case 'directProjectCosts':
      return formatNormalizedNumber(Math.max(0, parsedValue));
    case 'billableHoursPerMonth':
    case 'sections':
    case 'integrationsCount':
    case 'revisionRounds':
      return formatNormalizedNumber(Math.max(0, Math.round(parsedValue)), 0);
    case 'contingencyBufferPercent':
    case 'taxReservePercent':
    case 'profitMarginPercent':
      return formatNormalizedNumber(Math.min(100, Math.max(0, parsedValue)), 1);
  }
}

function getFieldError(field: FieldName, value: string) {
  const parsedValue = parseNumericValue(value);

  if (value.trim() === '') {
    switch (field) {
      case 'targetMonthlyNet':
        return 'Indica tu objetivo mensual.';
      case 'monthlyFixedCosts':
        return 'Indica tus costes fijos mensuales.';
      case 'billableHoursPerMonth':
        return 'Indica tus horas facturables al mes.';
      case 'sections':
        return 'Indica cuántas secciones tendrá la landing.';
      case 'integrationsCount':
        return 'Indica cuántas integraciones incluye.';
      case 'revisionRounds':
        return 'Indica las rondas de revisión previstas.';
      case 'directProjectCosts':
        return 'Indica los costes directos del proyecto.';
      case 'contingencyBufferPercent':
        return 'Indica un buffer de contingencia.';
      case 'taxReservePercent':
        return 'Indica una reserva fiscal orientativa.';
      case 'profitMarginPercent':
        return 'Indica el margen extra del proyecto.';
    }
  }

  if (!Number.isFinite(parsedValue)) {
    switch (field) {
      case 'billableHoursPerMonth':
      case 'sections':
      case 'integrationsCount':
      case 'revisionRounds':
        return 'Introduce un número válido.';
      case 'contingencyBufferPercent':
      case 'taxReservePercent':
      case 'profitMarginPercent':
        return 'Introduce un porcentaje válido.';
      default:
        return 'Introduce un importe válido.';
    }
  }

  if (field === 'targetMonthlyNet' && parsedValue <= 0) {
    return 'El objetivo mensual debe ser mayor que 0.';
  }

  if (field === 'billableHoursPerMonth' && parsedValue <= 0) {
    return 'Las horas facturables deben ser mayores que 0.';
  }

  if (field === 'billableHoursPerMonth' && !Number.isInteger(parsedValue)) {
    return 'Las horas facturables deben ser un número entero.';
  }

  if (field === 'sections' && parsedValue <= 0) {
    return 'Las secciones deben ser mayores que 0.';
  }

  if (field === 'integrationsCount' && parsedValue < 0) {
    return 'Las integraciones no pueden ser negativas.';
  }

  if (field === 'revisionRounds' && parsedValue < 0) {
    return 'Las revisiones no pueden ser negativas.';
  }

  if (
    (field === 'contingencyBufferPercent' ||
      field === 'taxReservePercent' ||
      field === 'profitMarginPercent') &&
    parsedValue > 100
  ) {
    return 'El porcentaje debe ser como máximo 100.';
  }

  if (parsedValue < 0) {
    switch (field) {
      case 'targetMonthlyNet':
        return 'El objetivo mensual no puede ser negativo.';
      case 'monthlyFixedCosts':
        return 'Los costes fijos no pueden ser negativos.';
      case 'billableHoursPerMonth':
        return 'Las horas facturables no pueden ser negativas.';
      case 'sections':
        return 'Las secciones no pueden ser negativas.';
      case 'integrationsCount':
        return 'Las integraciones no pueden ser negativas.';
      case 'revisionRounds':
        return 'Las revisiones no pueden ser negativas.';
      case 'directProjectCosts':
        return 'Los costes directos no pueden ser negativos.';
      case 'contingencyBufferPercent':
        return 'El buffer no puede ser negativo.';
      case 'taxReservePercent':
        return 'La reserva fiscal no puede ser negativa.';
      case 'profitMarginPercent':
        return 'El margen no puede ser negativo.';
    }
  }

  return '';
}

function validateForm(values: Record<FieldName, string>): FormErrors {
  const nextErrors: FormErrors = {};

  (Object.keys(values) as FieldName[]).forEach((field) => {
    const error = getFieldError(field, values[field]);

    if (error) {
      nextErrors[field] = error;
    }
  });

  return nextErrors;
}

export default function CalculatorForm() {
  const [targetMonthlyNet, setTargetMonthlyNet] = useState('2000');
  const [monthlyFixedCosts, setMonthlyFixedCosts] = useState('350');
  const [billableHoursPerMonth, setBillableHoursPerMonth] = useState('80');
  const [sections, setSections] = useState('6');
  const [integrationsCount, setIntegrationsCount] = useState('2');
  const [includeCopywriting, setIncludeCopywriting] = useState(true);
  const [revisionRounds, setRevisionRounds] = useState('2');
  const [directProjectCosts, setDirectProjectCosts] = useState('50');
  const [contingencyBufferPercent, setContingencyBufferPercent] = useState('15');
  const [taxReservePercent, setTaxReservePercent] = useState('20');
  const [profitMarginPercent, setProfitMarginPercent] = useState('10');
  const [hasIVA, setHasIVA] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const hasTrackedConversion = useRef(false);

  const validationErrors = useMemo(
    () =>
      validateForm({
        targetMonthlyNet,
        monthlyFixedCosts,
        billableHoursPerMonth,
        sections,
        integrationsCount,
        revisionRounds,
        directProjectCosts,
        contingencyBufferPercent,
        taxReservePercent,
        profitMarginPercent,
      }),
    [
      targetMonthlyNet,
      monthlyFixedCosts,
      billableHoursPerMonth,
      sections,
      integrationsCount,
      revisionRounds,
      directProjectCosts,
      contingencyBufferPercent,
      taxReservePercent,
      profitMarginPercent,
    ],
  );

  const parsedBillableHours = parseNumericValue(billableHoursPerMonth);
  const hasValidationErrors = Object.keys(validationErrors).length > 0;
  const showBillableHoursError =
    Boolean(validationErrors.billableHoursPerMonth) &&
    (submitted ||
      (billableHoursPerMonth.trim() !== '' &&
        Number.isFinite(parsedBillableHours) &&
        parsedBillableHours <= 0));

  const result = useMemo(() => {
    return calculateLandingPageQuote({
      targetMonthlyNet: parseNumericValue(targetMonthlyNet),
      monthlyFixedCosts: parseNumericValue(monthlyFixedCosts),
      billableHoursPerMonth: parseNumericValue(billableHoursPerMonth),
      sections: parseNumericValue(sections),
      integrationsCount: parseNumericValue(integrationsCount),
      includeCopywriting,
      revisionRounds: parseNumericValue(revisionRounds),
      directProjectCosts: parseNumericValue(directProjectCosts),
      contingencyBufferPercent: parseNumericValue(contingencyBufferPercent),
      taxReservePercent: parseNumericValue(taxReservePercent),
      profitMarginPercent: parseNumericValue(profitMarginPercent),
      hasIVA,
    });
  }, [
    targetMonthlyNet,
    monthlyFixedCosts,
    billableHoursPerMonth,
    sections,
    integrationsCount,
    includeCopywriting,
    revisionRounds,
    directProjectCosts,
    contingencyBufferPercent,
    taxReservePercent,
    profitMarginPercent,
    hasIVA,
  ]);

  return (
    <div className="calculator-card" id="calculadora">
      <h2>Calculadora</h2>
      <p className="card-intro" id="calculator-intro">
        Convierte tu objetivo mensual en un precio de landing page más defendible usando secciones,
        integraciones, revisiones, copy, buffer y una reserva fiscal orientativa.
      </p>

      <form
        noValidate
        aria-describedby="calculator-intro"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);

          if (!hasValidationErrors && !hasTrackedConversion.current) {
            hasTrackedConversion.current = true;
            void import('@vercel/analytics')
              .then(({ track }) => {
                track('landing_page_quote_calculated', {
                  hasIVA: hasIVA ? 'yes' : 'no',
                  includesCopywriting: includeCopywriting ? 'yes' : 'no',
                });
              })
              .catch(() => undefined);
          }
        }}
        className="calculator-form"
      >
        <label>
          <span>Objetivo mensual neto (EUR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={targetMonthlyNet}
            onChange={(event) => setTargetMonthlyNet(event.target.value)}
            onBlur={(event) =>
              setTargetMonthlyNet(normalizeFieldValue('targetMonthlyNet', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.targetMonthlyNet)}
            aria-describedby={
              submitted && validationErrors.targetMonthlyNet
                ? 'target-monthly-net-error'
                : undefined
            }
          />
          {submitted && validationErrors.targetMonthlyNet && (
            <small className="field-error" id="target-monthly-net-error" role="alert">
              {validationErrors.targetMonthlyNet}
            </small>
          )}
        </label>

        <label>
          <span>Costes fijos mensuales (EUR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={monthlyFixedCosts}
            onChange={(event) => setMonthlyFixedCosts(event.target.value)}
            onBlur={(event) =>
              setMonthlyFixedCosts(normalizeFieldValue('monthlyFixedCosts', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.monthlyFixedCosts)}
            aria-describedby={
              submitted && validationErrors.monthlyFixedCosts
                ? 'monthly-fixed-costs-error'
                : undefined
            }
          />
          {submitted && validationErrors.monthlyFixedCosts && (
            <small className="field-error" id="monthly-fixed-costs-error" role="alert">
              {validationErrors.monthlyFixedCosts}
            </small>
          )}
        </label>

        <label>
          <span>Horas facturables al mes</span>
          <input
            type="number"
            min="1"
            step="1"
            value={billableHoursPerMonth}
            onChange={(event) => setBillableHoursPerMonth(event.target.value)}
            onBlur={(event) =>
              setBillableHoursPerMonth(
                normalizeFieldValue('billableHoursPerMonth', event.target.value),
              )
            }
            aria-invalid={showBillableHoursError}
            aria-describedby={showBillableHoursError ? 'billable-hours-error' : undefined}
          />
          {showBillableHoursError && validationErrors.billableHoursPerMonth && (
            <small className="field-error" id="billable-hours-error" role="alert">
              {validationErrors.billableHoursPerMonth}
            </small>
          )}
        </label>

        <label>
          <span>Número de secciones</span>
          <input
            type="number"
            min="1"
            step="1"
            value={sections}
            onChange={(event) => setSections(event.target.value)}
            onBlur={(event) => setSections(normalizeFieldValue('sections', event.target.value))}
            aria-invalid={submitted && Boolean(validationErrors.sections)}
            aria-describedby={
              submitted && validationErrors.sections ? 'sections-error' : 'sections-hint'
            }
          />
          <small className="field-hint" id="sections-hint">
            Por ejemplo: hero, beneficios, proceso, testimonios, FAQ y CTA final.
          </small>
          {submitted && validationErrors.sections && (
            <small className="field-error" id="sections-error" role="alert">
              {validationErrors.sections}
            </small>
          )}
        </label>

        <label>
          <span>Número de integraciones</span>
          <input
            type="number"
            min="0"
            step="1"
            value={integrationsCount}
            onChange={(event) => setIntegrationsCount(event.target.value)}
            onBlur={(event) =>
              setIntegrationsCount(normalizeFieldValue('integrationsCount', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.integrationsCount)}
            aria-describedby={
              submitted && validationErrors.integrationsCount
                ? 'integrations-error'
                : 'integrations-hint'
            }
          />
          <small className="field-hint" id="integrations-hint">
            Formularios, email marketing, calendario, pagos, CRM o cualquier conexión externa.
          </small>
          {submitted && validationErrors.integrationsCount && (
            <small className="field-error" id="integrations-error" role="alert">
              {validationErrors.integrationsCount}
            </small>
          )}
        </label>

        <fieldset className="radio-group">
          <legend>¿Incluye copywriting?</legend>
          <label>
            <input
              type="radio"
              name="copywriting"
              checked={includeCopywriting}
              onChange={() => setIncludeCopywriting(true)}
            />
            Sí, lo redacto yo
          </label>
          <label>
            <input
              type="radio"
              name="copywriting"
              checked={!includeCopywriting}
              onChange={() => setIncludeCopywriting(false)}
            />
            No, lo aporta el cliente
          </label>
        </fieldset>

        <label>
          <span>Rondas de revisión previstas</span>
          <input
            type="number"
            min="0"
            step="1"
            value={revisionRounds}
            onChange={(event) => setRevisionRounds(event.target.value)}
            onBlur={(event) =>
              setRevisionRounds(normalizeFieldValue('revisionRounds', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.revisionRounds)}
            aria-describedby={
              submitted && validationErrors.revisionRounds ? 'revision-rounds-error' : undefined
            }
          />
          {submitted && validationErrors.revisionRounds && (
            <small className="field-error" id="revision-rounds-error" role="alert">
              {validationErrors.revisionRounds}
            </small>
          )}
        </label>

        <label>
          <span>Costes directos del proyecto (EUR)</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={directProjectCosts}
            onChange={(event) => setDirectProjectCosts(event.target.value)}
            onBlur={(event) =>
              setDirectProjectCosts(normalizeFieldValue('directProjectCosts', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.directProjectCosts)}
            aria-describedby={
              submitted && validationErrors.directProjectCosts
                ? 'direct-project-costs-error'
                : 'direct-project-costs-hint'
            }
          />
          <small className="field-hint" id="direct-project-costs-hint">
            Ejemplos: compra de plantilla, fotografías, licencias, herramientas o colaboraciones
            que no deberías absorber tú.
          </small>
          {submitted && validationErrors.directProjectCosts && (
            <small className="field-error" id="direct-project-costs-error" role="alert">
              {validationErrors.directProjectCosts}
            </small>
          )}
        </label>

        <label>
          <span>Buffer de contingencia (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={contingencyBufferPercent}
            onChange={(event) => setContingencyBufferPercent(event.target.value)}
            onBlur={(event) =>
              setContingencyBufferPercent(
                normalizeFieldValue('contingencyBufferPercent', event.target.value),
              )
            }
            aria-invalid={submitted && Boolean(validationErrors.contingencyBufferPercent)}
            aria-describedby={
              submitted && validationErrors.contingencyBufferPercent
                ? 'contingency-buffer-error'
                : 'contingency-buffer-hint'
            }
          />
          <small className="field-hint" id="contingency-buffer-hint">
            Úsalo para cubrir pequeños cambios, soporte, QA extra y desbordes normales del
            proyecto.
          </small>
          {submitted && validationErrors.contingencyBufferPercent && (
            <small className="field-error" id="contingency-buffer-error" role="alert">
              {validationErrors.contingencyBufferPercent}
            </small>
          )}
        </label>

        <label>
          <span>Reserva fiscal orientativa (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={taxReservePercent}
            onChange={(event) => setTaxReservePercent(event.target.value)}
            onBlur={(event) =>
              setTaxReservePercent(normalizeFieldValue('taxReservePercent', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.taxReservePercent)}
            aria-describedby={
              submitted && validationErrors.taxReservePercent
                ? 'tax-reserve-percent-error'
                : 'tax-reserve-hint'
            }
          />
          <small className="field-hint" id="tax-reserve-hint">
            No sustituye un cálculo fiscal exacto: solo evita fijar el precio como si todo el
            ingreso fuera limpio.
          </small>
          {submitted && validationErrors.taxReservePercent && (
            <small className="field-error" id="tax-reserve-percent-error" role="alert">
              {validationErrors.taxReservePercent}
            </small>
          )}
        </label>

        <label>
          <span>Margen extra sobre el proyecto (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            step="0.5"
            value={profitMarginPercent}
            onChange={(event) => setProfitMarginPercent(event.target.value)}
            onBlur={(event) =>
              setProfitMarginPercent(normalizeFieldValue('profitMarginPercent', event.target.value))
            }
            aria-invalid={submitted && Boolean(validationErrors.profitMarginPercent)}
            aria-describedby={
              submitted && validationErrors.profitMarginPercent
                ? 'profit-margin-percent-error'
                : undefined
            }
          />
          {submitted && validationErrors.profitMarginPercent && (
            <small className="field-error" id="profit-margin-percent-error" role="alert">
              {validationErrors.profitMarginPercent}
            </small>
          )}
        </label>

        <fieldset className="radio-group">
          <legend>¿Añadir IVA al presupuesto?</legend>
          <label>
            <input type="radio" name="iva" checked={hasIVA} onChange={() => setHasIVA(true)} />
            Sí
          </label>
          <label>
            <input type="radio" name="iva" checked={!hasIVA} onChange={() => setHasIVA(false)} />
            No
          </label>
        </fieldset>

        <button type="submit" className="primary-button">
          Calcular precio de la landing
        </button>

        {submitted && hasValidationErrors && (
          <p className="form-message" role="alert">
            Revisa los campos marcados antes de calcular.
          </p>
        )}

        <p className="form-note">
          La herramienta es orientativa: sirve para transformar una intuición difusa en un precio
          más defendible, no para cerrar un encaje fiscal exacto.
        </p>
      </form>

      {submitted && !hasValidationErrors && <ResultCard result={result} hasIVA={hasIVA} />}
    </div>
  );
}
