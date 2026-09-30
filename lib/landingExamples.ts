import { calculateLandingPageQuote, type CalculatorInput } from './calculator';

const sharedInputs = {
  targetMonthlyNet: 2000,
  monthlyFixedCosts: 350,
  billableHoursPerMonth: 80,
  taxReservePercent: 20,
  profitMarginPercent: 10,
  hasIVA: true,
};

export const landingExampleInputs = {
  basic: {
    ...sharedInputs,
    sections: 4,
    integrationsCount: 1,
    includeCopywriting: false,
    revisionRounds: 1,
    directProjectCosts: 0,
    contingencyBufferPercent: 10,
  },
  capture: {
    ...sharedInputs,
    sections: 6,
    integrationsCount: 2,
    includeCopywriting: true,
    revisionRounds: 2,
    directProjectCosts: 50,
    contingencyBufferPercent: 15,
  },
  expanded: {
    ...sharedInputs,
    sections: 8,
    integrationsCount: 3,
    includeCopywriting: true,
    revisionRounds: 3,
    directProjectCosts: 100,
    contingencyBufferPercent: 20,
  },
} satisfies Record<string, CalculatorInput>;

export const landingExampleQuotes = {
  basic: calculateLandingPageQuote(landingExampleInputs.basic),
  capture: calculateLandingPageQuote(landingExampleInputs.capture),
  expanded: calculateLandingPageQuote(landingExampleInputs.expanded),
};
