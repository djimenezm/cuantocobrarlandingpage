export function formatCurrency(value: number, useGrouping?: Intl.NumberFormatOptions['useGrouping']) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
    useGrouping,
  }).format(value);
}

export function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits }).format(value);
}
