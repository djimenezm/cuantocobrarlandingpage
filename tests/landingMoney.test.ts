import { calculateLandingPageQuote } from '@/lib/calculator';
import { landingExampleInputs } from '@/lib/landingExamples';

describe('landing monetary closure', () => {
  it.each([true, false])('sums displayed cents exactly when VAT is %s', (hasIVA) => {
    for (const targetMonthlyNet of [1234.56, 2000, 2500.5]) {
      for (const sections of [1, 6, 8]) {
        for (const directProjectCosts of [0, 50, 199.99]) {
          for (const profitMarginPercent of [0, 10, 25]) {
            const quote = calculateLandingPageQuote({
              ...landingExampleInputs.capture,
              targetMonthlyNet,
              sections,
              directProjectCosts,
              profitMarginPercent,
              hasIVA,
            });
            const baseCents = Math.round(quote.recommendedLandingPrice * 100);
            const vatCents = Math.round(quote.vatAmount * 100);

            expect(Math.round(quote.totalWithVAT * 100)).toBe(baseCents + vatCents);
            expect(vatCents).toBe(hasIVA ? Math.round(baseCents * 0.21) : 0);
          }
        }
      }
    }
  });
});
