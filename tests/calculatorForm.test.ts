import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FORM_VALUES,
  getNormalizedPastedValue,
  normalizeFieldValue,
  validateForm,
} from '@/lib/calculatorForm';

const numericValues = {
  targetMonthlyNet: DEFAULT_FORM_VALUES.targetMonthlyNet,
  monthlyFixedCosts: DEFAULT_FORM_VALUES.monthlyFixedCosts,
  billableHoursPerMonth: DEFAULT_FORM_VALUES.billableHoursPerMonth,
  sections: DEFAULT_FORM_VALUES.sections,
  integrationsCount: DEFAULT_FORM_VALUES.integrationsCount,
  revisionRounds: DEFAULT_FORM_VALUES.revisionRounds,
  directProjectCosts: DEFAULT_FORM_VALUES.directProjectCosts,
  contingencyBufferPercent: DEFAULT_FORM_VALUES.contingencyBufferPercent,
  taxReservePercent: DEFAULT_FORM_VALUES.taxReservePercent,
  profitMarginPercent: DEFAULT_FORM_VALUES.profitMarginPercent,
};

describe('calculator form values', () => {
  it('requires a positive target, billable hours and sections', () => {
    expect(validateForm(numericValues)).toEqual({});
    expect(validateForm({ ...numericValues, targetMonthlyNet: '0' }))
      .toHaveProperty('targetMonthlyNet');
    expect(validateForm({ ...numericValues, billableHoursPerMonth: '0' }))
      .toHaveProperty('billableHoursPerMonth');
    expect(validateForm({ ...numericValues, sections: '0' })).toHaveProperty('sections');
  });

  it('keeps invalid values and normalizes a pasted Spanish amount', () => {
    expect(normalizeFieldValue('directProjectCosts', 'invalid')).toBe('invalid');
    expect(getNormalizedPastedValue('directProjectCosts', '2.500,50 €')).toBe('2500.5');
    expect(getNormalizedPastedValue('directProjectCosts', 'invalid')).toBeNull();
  });

  it('requires integer counts and limits percentages', () => {
    expect(validateForm({ ...numericValues, revisionRounds: '1,5' }))
      .toHaveProperty('revisionRounds');
    expect(validateForm({ ...numericValues, contingencyBufferPercent: '101' }))
      .toHaveProperty('contingencyBufferPercent');
  });
});
