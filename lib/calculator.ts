export type CalculatorInput = {
  targetMonthlyNet: number;
  monthlyFixedCosts: number;
  billableHoursPerMonth: number;
  sections: number;
  integrationsCount: number;
  includeCopywriting: boolean;
  revisionRounds: number;
  directProjectCosts: number;
  contingencyBufferPercent: number;
  taxReservePercent: number;
  profitMarginPercent: number;
  hasIVA: boolean;
};

export type CalculationResult = {
  targetMonthlyNet: number;
  monthlyFixedCosts: number;
  billableHoursPerMonth: number;
  sections: number;
  integrationsCount: number;
  includeCopywriting: boolean;
  revisionRounds: number;
  directProjectCosts: number;
  contingencyBufferPercent: number;
  taxReservePercent: number;
  profitMarginPercent: number;
  preTaxIncomeTarget: number;
  monthlyRevenueTarget: number;
  baseHourlyRate: number;
  discoveryHours: number;
  sectionHours: number;
  integrationHours: number;
  copyHours: number;
  revisionHours: number;
  qaLaunchHours: number;
  estimatedProjectHours: number;
  bufferedProjectHours: number;
  minimumLandingPrice: number;
  recommendedLandingPrice: number;
  vatAmount: number;
  totalWithVAT: number;
  effectiveHourlyRate: number;
};

function roundToTwo(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function safeNumber(value: number, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

export function calculateLandingPageQuote({
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
}: CalculatorInput): CalculationResult {
  const safeTargetMonthlyNet = Math.max(0, safeNumber(targetMonthlyNet));
  const safeMonthlyFixedCosts = Math.max(0, safeNumber(monthlyFixedCosts));
  const safeBillableHoursPerMonth = Math.max(1, Math.round(safeNumber(billableHoursPerMonth, 1)));
  const safeSections = Math.max(1, Math.round(safeNumber(sections, 1)));
  const safeIntegrationsCount = Math.max(0, Math.round(safeNumber(integrationsCount)));
  const safeRevisionRounds = Math.max(0, Math.round(safeNumber(revisionRounds)));
  const safeDirectProjectCosts = Math.max(0, safeNumber(directProjectCosts));
  const safeContingencyBufferPercent = Math.min(100, Math.max(0, safeNumber(contingencyBufferPercent)));
  const safeTaxReservePercent = Math.min(99, Math.max(0, safeNumber(taxReservePercent)));
  const safeProfitMarginPercent = Math.min(100, Math.max(0, safeNumber(profitMarginPercent)));

  const taxReserveRate = safeTaxReservePercent / 100;
  const marginRate = safeProfitMarginPercent / 100;

  const preTaxIncomeTarget = safeTargetMonthlyNet / Math.max(0.01, 1 - taxReserveRate);
  const monthlyRevenueTarget = preTaxIncomeTarget + safeMonthlyFixedCosts;
  const baseHourlyRate = monthlyRevenueTarget / safeBillableHoursPerMonth;

  const discoveryHours = 2;
  const sectionHours = safeSections * 1.4;
  const integrationHours = safeIntegrationsCount * 1.25;
  const copyHours = includeCopywriting ? Math.max(1.5, safeSections * 0.75) : 0;
  const revisionHours = safeRevisionRounds * 1;
  const qaLaunchHours = 2.5;
  const estimatedProjectHours =
    discoveryHours + sectionHours + integrationHours + copyHours + revisionHours + qaLaunchHours;
  const bufferedProjectHours = estimatedProjectHours * (1 + safeContingencyBufferPercent / 100);
  const minimumLandingPrice = bufferedProjectHours * baseHourlyRate + safeDirectProjectCosts;
  const recommendedLandingPrice = minimumLandingPrice * (1 + marginRate);
  const vatAmount = hasIVA ? recommendedLandingPrice * 0.21 : 0;
  const totalWithVAT = recommendedLandingPrice + vatAmount;
  const effectiveHourlyRate = recommendedLandingPrice / bufferedProjectHours;

  return {
    targetMonthlyNet: roundToTwo(safeTargetMonthlyNet),
    monthlyFixedCosts: roundToTwo(safeMonthlyFixedCosts),
    billableHoursPerMonth: safeBillableHoursPerMonth,
    sections: safeSections,
    integrationsCount: safeIntegrationsCount,
    includeCopywriting,
    revisionRounds: safeRevisionRounds,
    directProjectCosts: roundToTwo(safeDirectProjectCosts),
    contingencyBufferPercent: roundToTwo(safeContingencyBufferPercent),
    taxReservePercent: roundToTwo(safeTaxReservePercent),
    profitMarginPercent: roundToTwo(safeProfitMarginPercent),
    preTaxIncomeTarget: roundToTwo(preTaxIncomeTarget),
    monthlyRevenueTarget: roundToTwo(monthlyRevenueTarget),
    baseHourlyRate: roundToTwo(baseHourlyRate),
    discoveryHours: roundToTwo(discoveryHours),
    sectionHours: roundToTwo(sectionHours),
    integrationHours: roundToTwo(integrationHours),
    copyHours: roundToTwo(copyHours),
    revisionHours: roundToTwo(revisionHours),
    qaLaunchHours: roundToTwo(qaLaunchHours),
    estimatedProjectHours: roundToTwo(estimatedProjectHours),
    bufferedProjectHours: roundToTwo(bufferedProjectHours),
    minimumLandingPrice: roundToTwo(minimumLandingPrice),
    recommendedLandingPrice: roundToTwo(recommendedLandingPrice),
    vatAmount: roundToTwo(vatAmount),
    totalWithVAT: roundToTwo(totalWithVAT),
    effectiveHourlyRate: roundToTwo(effectiveHourlyRate),
  };
}
