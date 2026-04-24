import { describe, expect, it } from 'vitest';
import { calculateLandingPageQuote } from '@/lib/calculator';

describe('calculateLandingPageQuote', () => {
  it('calculates a landing page quote from the monthly target and project inputs', () => {
    const result = calculateLandingPageQuote({
      targetMonthlyNet: 2000,
      monthlyFixedCosts: 350,
      billableHoursPerMonth: 80,
      sections: 6,
      integrationsCount: 2,
      includeCopywriting: true,
      revisionRounds: 2,
      directProjectCosts: 50,
      contingencyBufferPercent: 15,
      taxReservePercent: 20,
      profitMarginPercent: 10,
      hasIVA: true,
    });

    expect(result.preTaxIncomeTarget).toBe(2500);
    expect(result.monthlyRevenueTarget).toBe(2850);
    expect(result.baseHourlyRate).toBe(35.63);
    expect(result.discoveryHours).toBe(2);
    expect(result.sectionHours).toBe(8.4);
    expect(result.integrationHours).toBe(2.5);
    expect(result.copyHours).toBe(4.5);
    expect(result.revisionHours).toBe(2);
    expect(result.qaLaunchHours).toBe(2.5);
    expect(result.estimatedProjectHours).toBe(21.9);
    expect(result.bufferedProjectHours).toBe(25.18);
    expect(result.minimumLandingPrice).toBe(947.22);
    expect(result.recommendedLandingPrice).toBe(1041.94);
    expect(result.vatAmount).toBe(218.81);
    expect(result.totalWithVAT).toBe(1260.74);
    expect(result.effectiveHourlyRate).toBe(41.37);
  });

  it('does not add IVA when the quote does not repercute it', () => {
    const result = calculateLandingPageQuote({
      targetMonthlyNet: 2000,
      monthlyFixedCosts: 300,
      billableHoursPerMonth: 80,
      sections: 5,
      integrationsCount: 1,
      includeCopywriting: false,
      revisionRounds: 1,
      directProjectCosts: 0,
      contingencyBufferPercent: 10,
      taxReservePercent: 20,
      profitMarginPercent: 0,
      hasIVA: false,
    });

    expect(result.vatAmount).toBe(0);
    expect(result.totalWithVAT).toBe(result.recommendedLandingPrice);
  });

  it('sanitizes invalid values before calculating', () => {
    const result = calculateLandingPageQuote({
      targetMonthlyNet: Number.NaN,
      monthlyFixedCosts: -50,
      billableHoursPerMonth: 0,
      sections: Number.NaN,
      integrationsCount: -2,
      includeCopywriting: false,
      revisionRounds: -1,
      directProjectCosts: -10,
      contingencyBufferPercent: -20,
      taxReservePercent: 120,
      profitMarginPercent: -5,
      hasIVA: false,
    });

    expect(result).toEqual(
      expect.objectContaining({
        targetMonthlyNet: 0,
        monthlyFixedCosts: 0,
        billableHoursPerMonth: 1,
        sections: 1,
        integrationsCount: 0,
        revisionRounds: 0,
        directProjectCosts: 0,
        contingencyBufferPercent: 0,
        taxReservePercent: 99,
        profitMarginPercent: 0,
        preTaxIncomeTarget: 0,
        monthlyRevenueTarget: 0,
        baseHourlyRate: 0,
        minimumLandingPrice: 0,
        recommendedLandingPrice: 0,
        vatAmount: 0,
        totalWithVAT: 0,
        effectiveHourlyRate: 0,
      }),
    );
  });
});
