'use client';

import type { ClipboardEvent } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import ResultCard from '@/components/ResultCard';
import { calculateLandingPageQuote } from '@/lib/calculator';
import {
  DEFAULT_FORM_VALUES,
  type FieldName,
  getNormalizedPastedValue,
  normalizeFieldValue,
  validateForm,
} from '@/lib/calculatorForm';
import { parseSpanishNumber as parseNumericValue } from '@/lib/spanishNumber';

function handleNumericPaste(
  event: ClipboardEvent<HTMLInputElement>,
  field: FieldName,
  setValue: (value: string) => void,
) {
  const normalizedValue = getNormalizedPastedValue(field, event.clipboardData.getData('text'));

  if (normalizedValue === null) {
    return;
  }

  event.preventDefault();
  setValue(normalizedValue);
}

export default function CalculatorForm() {
  const [targetMonthlyNet, setTargetMonthlyNet] = useState(DEFAULT_FORM_VALUES.targetMonthlyNet);
  const [monthlyFixedCosts, setMonthlyFixedCosts] = useState(DEFAULT_FORM_VALUES.monthlyFixedCosts);
  const [billableHoursPerMonth, setBillableHoursPerMonth] = useState(
    DEFAULT_FORM_VALUES.billableHoursPerMonth,
  );
  const [sections, setSections] = useState(DEFAULT_FORM_VALUES.sections);
  const [integrationsCount, setIntegrationsCount] = useState(DEFAULT_FORM_VALUES.integrationsCount);
  const [includeCopywriting, setIncludeCopywriting] = useState(DEFAULT_FORM_VALUES.includeCopywriting);
  const [revisionRounds, setRevisionRounds] = useState(DEFAULT_FORM_VALUES.revisionRounds);
  const [directProjectCosts, setDirectProjectCosts] = useState(DEFAULT_FORM_VALUES.directProjectCosts);
  const [contingencyBufferPercent, setContingencyBufferPercent] = useState(
    DEFAULT_FORM_VALUES.contingencyBufferPercent,
  );
  const [taxReservePercent, setTaxReservePercent] = useState(DEFAULT_FORM_VALUES.taxReservePercent);
  const [profitMarginPercent, setProfitMarginPercent] = useState(
    DEFAULT_FORM_VALUES.profitMarginPercent,
  );
  const [hasIVA, setHasIVA] = useState(DEFAULT_FORM_VALUES.hasIVA);
  const [submitted, setSubmitted] = useState(false);
  const [invalidSubmissionCount, setInvalidSubmissionCount] = useState(0);
  const formRef = useRef<HTMLFormElement | null>(null);
  const hasTrackedConversion = useRef(false);

  useEffect(() => {
    if (invalidSubmissionCount > 0) {
      formRef.current?.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus();
    }
  }, [invalidSubmissionCount]);

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
        Define tus números y el alcance. El resultado aparece al calcular, sin registro.
      </p>

      <form
        ref={formRef}
        noValidate
        aria-describedby="calculator-intro"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);

          if (hasValidationErrors) {
            setInvalidSubmissionCount((count) => count + 1);
          }

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
            onPaste={(event) =>
              handleNumericPaste(event, 'targetMonthlyNet', setTargetMonthlyNet)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'monthlyFixedCosts', setMonthlyFixedCosts)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'billableHoursPerMonth', setBillableHoursPerMonth)
            }
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
            onPaste={(event) => handleNumericPaste(event, 'sections', setSections)}
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
            onPaste={(event) =>
              handleNumericPaste(event, 'integrationsCount', setIntegrationsCount)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'revisionRounds', setRevisionRounds)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'directProjectCosts', setDirectProjectCosts)
            }
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
            onPaste={(event) =>
              handleNumericPaste(
                event,
                'contingencyBufferPercent',
                setContingencyBufferPercent,
              )
            }
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
            max="99"
            step="0.5"
            value={taxReservePercent}
            onChange={(event) => setTaxReservePercent(event.target.value)}
            onPaste={(event) =>
              handleNumericPaste(event, 'taxReservePercent', setTaxReservePercent)
            }
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
            onPaste={(event) =>
              handleNumericPaste(event, 'profitMarginPercent', setProfitMarginPercent)
            }
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
