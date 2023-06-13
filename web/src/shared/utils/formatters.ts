export const fillTimeUnitLength =
  (timeUnit: number) => String(timeUnit).padStart(2, '0');

export const formatNumberToCurrency = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format;
