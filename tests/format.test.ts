import { describe, expect, it } from 'vitest';
import { formatNumber } from '@/lib/format';

describe('formatNumber', () => {
  it('formats fractional hours using the Spanish decimal separator', () => {
    expect(formatNumber(21.9, 2)).toBe('21,9');
    expect(formatNumber(25.18, 2)).toBe('25,18');
  });
});
