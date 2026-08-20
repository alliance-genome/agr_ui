import { getSelectedAlleleCategory } from '../useAlleleSelection';

describe('getSelectedAlleleCategory', () => {
  test('derives one-variant category from the fetched variant list', () => {
    expect(getSelectedAlleleCategory({ alterationType: 'incorrect', variantList: [{}] })).toBe(
      'allele with one variant'
    );
  });

  test('derives multiple-variant category from the fetched variant list', () => {
    expect(getSelectedAlleleCategory({ alterationType: 'incorrect', variantList: [{}, {}] })).toBe(
      'allele with multiple variants'
    );
  });

  test('falls back to the individual allele response without variants', () => {
    expect(getSelectedAlleleCategory({ alterationType: 'allele' })).toBe('allele');
  });
});
