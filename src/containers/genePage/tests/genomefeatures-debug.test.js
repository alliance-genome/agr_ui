/**
 * Debug test to understand how parseLocString and region objects work
 */

describe('genomefeatures debugging', () => {
  test('parseLocString should return correct format', () => {
    const { parseLocString } = require('genomefeatures');
    
    // Test with fly chromosome (like Notch gene)
    const result = parseLocString('X:3134870..3172221');
    console.log('parseLocString result:', result);
    
    expect(result).toEqual({
      chromosome: 'X',
      start: 3134870,
      end: 3172221
    });
  });

  test('should create proper region object for NCList', () => {
    const { parseLocString } = require('genomefeatures');
    
    const locString = 'X:3134870..3172221';
    const parsedRegion = parseLocString(locString);
    
    // This is what we pass to fetchNCListData
    const region = {
      chromosome: parsedRegion.chromosome,
      start: parsedRegion.start,
      end: parsedRegion.end
    };
    
    console.log('Region object for NCList:', region);
    
    expect(region.chromosome).toBe('X');
    expect(region.start).toBe(3134870);
    expect(region.end).toBe(3172221);
  });

  test('should handle chromosome formatting for fly species', () => {
    // Test chromosome formatting for different species
    const testCases = [
      { input: 'X:100..200', species: 'fly', expected: 'X' },
      { input: 'chrX:100..200', species: 'yeast', expected: 'chrX' },
      { input: '2L:100..200', species: 'fly', expected: '2L' },
    ];

    testCases.forEach(testCase => {
      const { parseLocString } = require('genomefeatures');
      const result = parseLocString(testCase.input);
      
      console.log(`${testCase.species} chromosome parsing:`, result);
      expect(result.chromosome).toBe(testCase.expected);
    });
  });
});