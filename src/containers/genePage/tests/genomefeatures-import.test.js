/**
 * Test to verify genomefeatures package imports work correctly
 * This tests the upgrade from agr_genomefeaturecomponent to genomefeatures
 */

describe('genomefeatures package imports', () => {
  test('should import GenomeFeatureViewer successfully', () => {
    const { GenomeFeatureViewer } = require('genomefeatures');
    expect(GenomeFeatureViewer).toBeDefined();
    expect(typeof GenomeFeatureViewer).toBe('function');
  });

  test('should import fetchNCListData successfully', () => {
    const { fetchNCListData } = require('genomefeatures');
    expect(fetchNCListData).toBeDefined();
    expect(typeof fetchNCListData).toBe('function');
  });

  test('should import fetchTabixVcfData successfully', () => {
    const { fetchTabixVcfData } = require('genomefeatures');
    expect(fetchTabixVcfData).toBeDefined();
    expect(typeof fetchTabixVcfData).toBe('function');
  });

  test('should import parseLocString successfully', () => {
    const { parseLocString } = require('genomefeatures');
    expect(parseLocString).toBeDefined();
    expect(typeof parseLocString).toBe('function');
  });

  test('parseLocString should work correctly with test data', () => {
    const { parseLocString } = require('genomefeatures');

    const result = parseLocString('2L:130639..135911');
    expect(result).toEqual({
      chromosome: '2L',
      start: 130639,
      end: 135911,
    });
  });

  test('should import all functions at once', () => {
    const { GenomeFeatureViewer, fetchNCListData, fetchTabixVcfData, parseLocString } = require('genomefeatures');

    expect(GenomeFeatureViewer).toBeDefined();
    expect(fetchNCListData).toBeDefined();
    expect(fetchTabixVcfData).toBeDefined();
    expect(parseLocString).toBeDefined();
  });
});
