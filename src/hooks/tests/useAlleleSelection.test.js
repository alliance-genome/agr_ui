import { buildSelectedAlleleRow, getSelectedAlleleCategory, getSelectedVariantList } from '../useAlleleSelection';
import { getIdentifier } from '../../components/dataTable/utils';

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

describe('buildSelectedAlleleRow', () => {
  test('preserves the nested allele shape used to match viewer selections to table rows', () => {
    const response = {
      category: 'allele_summary',
      allele: {
        primaryExternalId: 'MGI:2667355',
        alleleSymbol: { displayText: 'Ahr<sup>b-2</sup>' },
      },
      alterationType: 'allele',
      hasPhenotype: true,
      hasDisease: false,
      variantList: [{}],
    };

    const row = buildSelectedAlleleRow(response);

    expect(getIdentifier(row.allele)).toBe('MGI:2667355');
    expect(row.alterationType).toBe('allele with one variant');
    expect(row.hasPhenotype).toBe(true);
    expect(row.hasDisease).toBe(false);
    expect(row.variantList).toBe(response.variantList);
  });
});

describe('getSelectedVariantList', () => {
  test('extracts variants from allele variant summary rows', () => {
    const variants = [{ curatedVariantGenomicLocations: [{ hgvs: 'NC_000078.7:g.35550690A>G' }] }];
    const response = {
      results: [{ category: 'variant_summary', variantList: variants }],
    };

    expect(getSelectedVariantList(response)).toEqual(variants);
  });
});
