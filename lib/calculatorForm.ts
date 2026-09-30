import { parseSpanishNumber as parseNumericValue } from '@/lib/spanishNumber';

export type FieldName =
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

export const DEFAULT_FORM_VALUES = {
  targetMonthlyNet: '2000',
  monthlyFixedCosts: '350',
  billableHoursPerMonth: '80',
  sections: '6',
  integrationsCount: '2',
  includeCopywriting: true,
  revisionRounds: '2',
  directProjectCosts: '50',
  contingencyBufferPercent: '15',
  taxReservePercent: '20',
  profitMarginPercent: '10',
  hasIVA: true,
};

function formatNormalizedNumber(value: number, maximumFractionDigits = 2) {
  return value.toLocaleString('en-US', {
    useGrouping: false,
    maximumFractionDigits,
  });
}

export function normalizeFieldValue(field: FieldName, value: string) {
  const parsedValue = parseNumericValue(value);

  if (!Number.isFinite(parsedValue) || getFieldError(field, value)) {
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
    case 'profitMarginPercent':
      return formatNormalizedNumber(Math.min(100, Math.max(0, parsedValue)), 1);
    case 'taxReservePercent':
      return formatNormalizedNumber(parsedValue, 1);
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
      field === 'profitMarginPercent') &&
    parsedValue > 100
  ) {
    return 'El porcentaje debe ser como máximo 100.';
  }

  if (field === 'taxReservePercent' && parsedValue > 99) {
    return 'La reserva fiscal debe ser como máximo 99.';
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

  if (
    (field === 'sections' || field === 'integrationsCount' || field === 'revisionRounds') &&
    !Number.isInteger(parsedValue)
  ) {
    return 'Introduce un número entero.';
  }

  return '';
}

export function getNormalizedPastedValue(field: FieldName, value: string) {
  const parsedValue = parseNumericValue(value);
  return Number.isFinite(parsedValue)
    ? normalizeFieldValue(field, String(parsedValue))
    : null;
}

export function validateForm(values: Record<FieldName, string>): FormErrors {
  const nextErrors: FormErrors = {};

  (Object.keys(values) as FieldName[]).forEach((field) => {
    const error = getFieldError(field, values[field]);

    if (error) {
      nextErrors[field] = error;
    }
  });

  return nextErrors;
}
