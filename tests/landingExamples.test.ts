import { describe, expect, it } from 'vitest';
import { calculateLandingPageQuote } from '../lib/calculator';
import { landingExampleInputs, landingExampleQuotes } from '../lib/landingExamples';

describe('editorial landing examples', () => {
  it('uses the calculator for each scope', () => {
    for (const scope of ['basic', 'capture', 'ads', 'expanded'] as const) {
      expect(landingExampleQuotes[scope]).toEqual(calculateLandingPageQuote(landingExampleInputs[scope]));
    }
  });

  it('keeps the scope comparison meaningful', () => {
    expect(landingExampleQuotes.basic.recommendedLandingPrice)
      .toBeLessThan(landingExampleQuotes.capture.recommendedLandingPrice);
    expect(landingExampleQuotes.capture.recommendedLandingPrice)
      .toBeLessThan(landingExampleQuotes.expanded.recommendedLandingPrice);
    expect(landingExampleQuotes.capture.minimumLandingPrice)
      .toBeLessThan(landingExampleQuotes.capture.recommendedLandingPrice);
    expect(landingExampleQuotes.ads.minimumLandingPrice)
      .toBeLessThan(landingExampleQuotes.ads.recommendedLandingPrice);
    expect(landingExampleQuotes.ads.recommendedLandingPrice)
      .toBeGreaterThan(landingExampleQuotes.basic.recommendedLandingPrice);
  });
});
