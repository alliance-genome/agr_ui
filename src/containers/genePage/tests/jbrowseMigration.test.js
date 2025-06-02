import assert from 'assert';
import { getSpecies } from '../../../lib/utils';

describe('JBrowse Migration Validation', () => {
  describe('Species Configuration', () => {
    it('should have JBrowse URL templates for mouse species', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090');
      
      // Verify JBrowse URL templates exist
      assert(speciesInfo.jBrowsenclistbaseurltemplate, 'Should have JBrowse NCList URL template');
      assert(speciesInfo.jBrowseVcfUrlTemplate, 'Should have JBrowse VCF URL template');
      
      // Verify URL templates contain {release} placeholder
      assert(speciesInfo.jBrowsenclistbaseurltemplate.includes('{release}'), 
        'NCList URL template should contain {release} placeholder');
      assert(speciesInfo.jBrowseVcfUrlTemplate.includes('{release}'), 
        'VCF URL template should contain {release} placeholder');
    });

    it('should have correct S3 URL patterns for version 8.2.0', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090'); // Mouse
      
      // Verify S3 URL structure targets correct paths
      assert(speciesInfo.jBrowsenclistbaseurltemplate.includes('agrjbrowse/docker'), 
        'Should use agrjbrowse S3 bucket');
      assert(speciesInfo.jBrowsenclistbaseurltemplate.includes('MGI/mouse'), 
        'Should use correct species path for mouse');
    });

    it('should support all Alliance species with JBrowse URLs', () => {
      const testSpecies = [
        'NCBITaxon:10090', // Mouse  
        'NCBITaxon:7227',  // Fly
        'NCBITaxon:6239',  // Worm
        'NCBITaxon:559292', // Yeast
        'NCBITaxon:7955',  // Zebrafish
        'NCBITaxon:10116', // Rat
        'NCBITaxon:8355',  // X. laevis
        'NCBITaxon:8364'   // X. tropicalis
      ];

      testSpecies.forEach(taxonId => {
        const speciesInfo = getSpecies(taxonId);
        assert(speciesInfo.jBrowsenclistbaseurltemplate, 
          `Species ${taxonId} should have JBrowse NCList URL`);
        assert(speciesInfo.jBrowseVcfUrlTemplate, 
          `Species ${taxonId} should have JBrowse VCF URL`);
      });
    });

    it('should have species-specific S3 paths for different organisms', () => {
      const testCases = [
        { taxonId: 'NCBITaxon:10090', expectedPath: 'MGI/mouse' },     // Mouse
        { taxonId: 'NCBITaxon:7227', expectedPath: 'FlyBase/fruitfly' }, // Fly  
        { taxonId: 'NCBITaxon:6239', expectedPath: 'WormBase/c_elegans_PRJNA13758' }, // Worm
        { taxonId: 'NCBITaxon:559292', expectedPath: 'SGD/yeast' },     // Yeast
      ];

      testCases.forEach(({ taxonId, expectedPath }) => {
        const speciesInfo = getSpecies(taxonId);
        assert(speciesInfo.jBrowsenclistbaseurltemplate.includes(expectedPath), 
          `Species ${taxonId} should use path ${expectedPath}`);
      });
    });
  });

  describe('URL Construction', () => {
    it('should construct JBrowse URLs with version 8.2.0', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090');
      const releaseVersion = '8.2.0';
      
      // Test URL template replacement
      const ncListUrl = speciesInfo.jBrowsenclistbaseurltemplate.replace('{release}', releaseVersion);
      const vcfUrl = speciesInfo.jBrowseVcfUrlTemplate.replace('{release}', releaseVersion);
      
      assert(ncListUrl.includes('8.2.0'), 'NCList URL should contain version 8.2.0');
      assert(vcfUrl.includes('8.2.0'), 'VCF URL should contain version 8.2.0');
      assert(!ncListUrl.includes('{release}'), 'NCList URL should not contain placeholder');
      assert(!vcfUrl.includes('{release}'), 'VCF URL should not contain placeholder');
    });

    it('should target correct S3 bucket and data structure', () => {
      const speciesInfo = getSpecies('NCBITaxon:7227'); // Fly
      const releaseVersion = '8.2.0';
      
      const ncListUrl = speciesInfo.jBrowsenclistbaseurltemplate.replace('{release}', releaseVersion);
      const vcfUrl = speciesInfo.jBrowseVcfUrlTemplate.replace('{release}', releaseVersion);
      
      // Verify S3 structure
      assert(ncListUrl.includes('s3.amazonaws.com/agrjbrowse/docker/8.2.0/FlyBase/fruitfly'), 
        'Should target correct S3 path for fly NCList data');
      assert(vcfUrl.includes('s3.amazonaws.com/agrjbrowse/VCF/8.2.0/FlyBase/fruitfly'), 
        'Should target correct S3 path for fly VCF data');
    });
  });

  describe('Migration Verification', () => {
    it('should use static file access pattern', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090');
      
      // Verify we're using static file URLs, not API endpoints
      assert(speciesInfo.jBrowsenclistbaseurltemplate.includes('s3.amazonaws.com'), 
        'Should use S3 static file URLs');
      assert(speciesInfo.jBrowseVcfUrlTemplate.includes('s3.amazonaws.com'), 
        'Should use S3 static file URLs for VCF');
      
      // Verify it doesn't contain Apollo patterns
      assert(!speciesInfo.jBrowsenclistbaseurltemplate.includes('/apollo/'), 
        'Should not contain Apollo server paths');
      assert(!speciesInfo.jBrowseVcfUrlTemplate.includes('/apollo/'), 
        'Should not contain Apollo server paths');
    });

    it('should provide version-aware configuration system', () => {
      const allSpecies = [
        'NCBITaxon:10090', 'NCBITaxon:7227', 'NCBITaxon:6239', 
        'NCBITaxon:559292', 'NCBITaxon:7955', 'NCBITaxon:10116',
        'NCBITaxon:8355', 'NCBITaxon:8364', 'NCBITaxon:2697049'
      ];

      allSpecies.forEach(taxonId => {
        const speciesInfo = getSpecies(taxonId);
        
        // All species should have version-aware URLs
        assert(speciesInfo.jBrowsenclistbaseurltemplate.includes('{release}'), 
          `Species ${taxonId} NCList URL should be version-aware`);
        assert(speciesInfo.jBrowseVcfUrlTemplate.includes('{release}'), 
          `Species ${taxonId} VCF URL should be version-aware`);
      });
    });

    it('should support fresh genomic data access (version 8.2.0 vs 5.3.0)', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090');
      
      // Test that version replacement works for both old and new versions
      const newVersionUrl = speciesInfo.jBrowsenclistbaseurltemplate.replace('{release}', '8.2.0');
      const oldVersionUrl = speciesInfo.jBrowsenclistbaseurltemplate.replace('{release}', '5.3.0');
      
      assert(newVersionUrl.includes('8.2.0'), 'Should support new data version 8.2.0');
      assert(oldVersionUrl.includes('5.3.0'), 'Should support old data version 5.3.0');
      assert(newVersionUrl !== oldVersionUrl, 'Different versions should generate different URLs');
    });
  });

  describe('Data Format Validation', () => {
    it('should target correct file formats for JBrowse', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090');
      
      // NCList URLs should target .jsonz files
      assert(speciesInfo.jBrowseurltemplate.includes('trackData.jsonz'), 
        'Should target JBrowse NCList .jsonz format');
      
      // VCF URLs should target .vcf.gz files (when combined with filename)
      const vcfBaseUrl = speciesInfo.jBrowseVcfUrlTemplate.replace('{release}', '8.2.0');
      assert(vcfBaseUrl.endsWith('/'), 'VCF URL template should end with / for file appending');
    });

    it('should maintain existing Apollo configuration fields for compatibility', () => {
      const speciesInfo = getSpecies('NCBITaxon:7227'); // Fly
      
      // These fields should still exist for backward compatibility or other uses
      assert(speciesInfo.apolloName, 'Should maintain apolloName for species identification');
      assert(speciesInfo.apolloTrack, 'Should maintain apolloTrack for reference');
      
      // But JBrowse fields should be the primary data source
      assert(speciesInfo.jBrowsenclistbaseurltemplate, 'Should have JBrowse as primary data source');
    });
  });
});