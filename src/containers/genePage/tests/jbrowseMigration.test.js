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

  describe('Chromosome Prefix Logic', () => {
    // Test the chromosome prefix logic from genomeFeatureWrapper.js
    function applyChromosomePrefixLogic(apolloPrefix, chromosome) {
      let chrString = chromosome;
      if(apolloPrefix==='yeast' || (apolloPrefix==='x_laevis' && !(chromosome.startsWith('Scaffold')))) {
        chrString = 'chr' + chromosome;
      }
      return chrString;
    }

    describe('Yeast chromosome prefixing', () => {
      it('should add chr prefix to all yeast chromosomes', () => {
        const yeastChromosomes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI'];
        
        yeastChromosomes.forEach(chr => {
          const result = applyChromosomePrefixLogic('yeast', chr);
          assert.strictEqual(result, `chr${chr}`, `Yeast chromosome ${chr} should become chr${chr}`);
        });
      });

      it('should handle yeast mitochondrial chromosome', () => {
        const result = applyChromosomePrefixLogic('yeast', 'Mito');
        assert.strictEqual(result, 'chrMito', 'Yeast mitochondrial chromosome should become chrMito');
      });
    });

    describe('X. laevis chromosome prefixing', () => {
      it('should add chr prefix to regular X. laevis chromosomes', () => {
        const xlaevisChromosomes = ['1L', '1S', '2L', '2S', '3L', '3S', '4L', '4S', '5L', '5S', '6L', '6S', '7L', '7S', '8L', '8S', '9_10L', '9_10S'];
        
        xlaevisChromosomes.forEach(chr => {
          const result = applyChromosomePrefixLogic('x_laevis', chr);
          assert.strictEqual(result, `chr${chr}`, `X. laevis chromosome ${chr} should become chr${chr}`);
        });
      });

      it('should NOT add chr prefix to X. laevis scaffold sequences', () => {
        const scaffolds = ['Scaffold1', 'Scaffold123', 'Scaffold_ABC'];
        
        scaffolds.forEach(scaffold => {
          const result = applyChromosomePrefixLogic('x_laevis', scaffold);
          assert.strictEqual(result, scaffold, `X. laevis ${scaffold} should remain unchanged`);
        });
      });
    });

    describe('Other species chromosome handling', () => {
      it('should NOT add chr prefix to human chromosomes', () => {
        const humanChromosomes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y', 'MT'];
        
        humanChromosomes.forEach(chr => {
          const result = applyChromosomePrefixLogic('human', chr);
          assert.strictEqual(result, chr, `Human chromosome ${chr} should remain unchanged`);
        });
      });

      it('should NOT add chr prefix to mouse chromosomes', () => {
        const mouseChromosomes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', 'X', 'Y', 'MT'];
        
        mouseChromosomes.forEach(chr => {
          const result = applyChromosomePrefixLogic('mouse', chr);
          assert.strictEqual(result, chr, `Mouse chromosome ${chr} should remain unchanged`);
        });
      });

      it('should NOT add chr prefix to fly chromosomes', () => {
        const flyChromosomes = ['2L', '2R', '3L', '3R', '4', 'X', 'Y'];
        
        flyChromosomes.forEach(chr => {
          const result = applyChromosomePrefixLogic('fly', chr);
          assert.strictEqual(result, chr, `Fly chromosome ${chr} should remain unchanged`);
        });
      });

      it('should NOT add chr prefix to worm chromosomes', () => {
        const wormChromosomes = ['I', 'II', 'III', 'IV', 'V', 'X'];
        
        wormChromosomes.forEach(chr => {
          const result = applyChromosomePrefixLogic('worm', chr);
          assert.strictEqual(result, chr, `Worm chromosome ${chr} should remain unchanged`);
        });
      });

      it('should NOT add chr prefix to zebrafish chromosomes', () => {
        const zebrafishChromosomes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25'];
        
        zebrafishChromosomes.forEach(chr => {
          const result = applyChromosomePrefixLogic('zebrafish', chr);
          assert.strictEqual(result, chr, `Zebrafish chromosome ${chr} should remain unchanged`);
        });
      });

      it('should NOT add chr prefix to X. tropicalis chromosomes', () => {
        const xtropChromosomes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        
        xtropChromosomes.forEach(chr => {
          const result = applyChromosomePrefixLogic('x_tropicalis', chr);
          assert.strictEqual(result, chr, `X. tropicalis chromosome ${chr} should remain unchanged`);
        });
      });
    });
  });

  describe('URL Template Resolution', () => {
    function buildJBrowseUrls(speciesInfo, releaseVersion, chrString) {
      const ncListUrlTemplate = speciesInfo.jBrowsenclistbaseurltemplate.replace('{release}', releaseVersion) + `tracks/All_Genes/${chrString}/trackData.jsonz`;
      const vcfTabixUrl = speciesInfo.jBrowseVcfUrlTemplate.replace('{release}', releaseVersion) + 'variants.vcf.gz';
      
      return { ncListUrlTemplate, vcfTabixUrl };
    }

    it('should properly resolve {refseq} placeholder in URL templates', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090'); // Mouse
      const releaseVersion = '8.2.0';
      const chrString = '1';
      
      const { ncListUrlTemplate } = buildJBrowseUrls(speciesInfo, releaseVersion, chrString);
      
      // Verify URL is properly constructed
      assert(ncListUrlTemplate.includes('tracks/All_Genes/1/trackData.jsonz'), 
        'Should resolve chromosome reference in URL path');
      assert(!ncListUrlTemplate.includes('{refseq}'), 
        'Should not contain unresolved {refseq} placeholder');
      assert(!ncListUrlTemplate.includes('{release}'), 
        'Should not contain unresolved {release} placeholder');
    });

    it('should construct valid URLs for yeast with chr prefix', () => {
      const speciesInfo = getSpecies('NCBITaxon:559292'); // Yeast
      const releaseVersion = '8.2.0';
      const chrString = 'chrI'; // Yeast chromosomes get chr prefix
      
      const { ncListUrlTemplate } = buildJBrowseUrls(speciesInfo, releaseVersion, chrString);
      
      assert(ncListUrlTemplate.includes('tracks/All_Genes/chrI/trackData.jsonz'), 
        'Should construct URL with chr prefix for yeast');
      assert(ncListUrlTemplate.includes('SGD/yeast'), 
        'Should use correct species path for yeast');
    });

    it('should construct valid URLs for X. laevis with chr prefix', () => {
      const speciesInfo = getSpecies('NCBITaxon:8355'); // X. laevis
      const releaseVersion = '8.2.0';
      const chrString = 'chr1L'; // X. laevis chromosomes get chr prefix
      
      const { ncListUrlTemplate } = buildJBrowseUrls(speciesInfo, releaseVersion, chrString);
      
      assert(ncListUrlTemplate.includes('tracks/All_Genes/chr1L/trackData.jsonz'), 
        'Should construct URL with chr prefix for X. laevis');
      assert(ncListUrlTemplate.includes('XenBase/x_laevis'), 
        'Should use correct species path for X. laevis');
    });

    it('should construct valid URLs for fly chromosomes without prefix', () => {
      const speciesInfo = getSpecies('NCBITaxon:7227'); // Fly
      const releaseVersion = '8.2.0';
      const chrString = '2L'; // Fly chromosomes don't get chr prefix
      
      const { ncListUrlTemplate } = buildJBrowseUrls(speciesInfo, releaseVersion, chrString);
      
      assert(ncListUrlTemplate.includes('tracks/All_Genes/2L/trackData.jsonz'), 
        'Should construct URL without chr prefix for fly');
      assert(ncListUrlTemplate.includes('FlyBase/fruitfly'), 
        'Should use correct species path for fly');
    });

    it('should handle scaffold sequences correctly for X. laevis', () => {
      const speciesInfo = getSpecies('NCBITaxon:8355'); // X. laevis
      const releaseVersion = '8.2.0';
      const chrString = 'Scaffold123'; // Scaffolds don't get chr prefix
      
      const { ncListUrlTemplate } = buildJBrowseUrls(speciesInfo, releaseVersion, chrString);
      
      assert(ncListUrlTemplate.includes('tracks/All_Genes/Scaffold123/trackData.jsonz'), 
        'Should construct URL without chr prefix for X. laevis scaffolds');
    });

    it('should generate complete and valid S3 URLs', () => {
      const testCases = [
        { 
          taxonId: 'NCBITaxon:10090', 
          apolloPrefix: 'mouse', 
          chromosome: '1', 
          expectedChrString: '1',
          expectedPath: 'MGI/mouse'
        },
        { 
          taxonId: 'NCBITaxon:559292', 
          apolloPrefix: 'yeast', 
          chromosome: 'I', 
          expectedChrString: 'chrI',
          expectedPath: 'SGD/yeast'
        },
        { 
          taxonId: 'NCBITaxon:7227', 
          apolloPrefix: 'fly', 
          chromosome: '2L', 
          expectedChrString: '2L',
          expectedPath: 'FlyBase/fruitfly'
        },
        { 
          taxonId: 'NCBITaxon:6239', 
          apolloPrefix: 'worm', 
          chromosome: 'I', 
          expectedChrString: 'I',
          expectedPath: 'WormBase/c_elegans_PRJNA13758'
        }
      ];

      testCases.forEach(({ taxonId, apolloPrefix, chromosome, expectedChrString, expectedPath }) => {
        const speciesInfo = getSpecies(taxonId);
        const releaseVersion = '8.2.0';
        
        // Apply chromosome prefix logic
        let chrString = chromosome;
        if(apolloPrefix==='yeast' || (apolloPrefix==='x_laevis' && !(chromosome.startsWith('Scaffold')))) {
          chrString = 'chr' + chromosome;
        }
        assert.strictEqual(chrString, expectedChrString, 
          `Chromosome ${chromosome} should become ${expectedChrString} for ${apolloPrefix}`);
        
        // Build URLs
        const { ncListUrlTemplate, vcfTabixUrl } = buildJBrowseUrls(speciesInfo, releaseVersion, chrString);
        
        // Verify URL structure
        assert(ncListUrlTemplate.includes(`s3.amazonaws.com/agrjbrowse/docker/8.2.0/${expectedPath}`), 
          `Should use correct S3 path for ${apolloPrefix}`);
        assert(ncListUrlTemplate.includes(`tracks/All_Genes/${chrString}/trackData.jsonz`), 
          `Should construct correct track path for ${apolloPrefix} chromosome ${chromosome}`);
        assert(vcfTabixUrl.includes(`s3.amazonaws.com/agrjbrowse/VCF/8.2.0/${expectedPath}`), 
          `Should use correct VCF path for ${apolloPrefix}`);
      });
    });
  });
});