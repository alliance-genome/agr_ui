import assert from 'assert';
import { getSpecies } from '../../../lib/utils';

describe('JBrowse Migration Validation', () => {
  describe('Species Configuration', () => {
    it('should have JBrowse GFF3 and VCF URL templates for mouse species', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090');

      // Verify JBrowse URL templates exist
      assert(speciesInfo.jBrowseGffUrlTemplate, 'Should have JBrowse tabix GFF3 URL template');
      assert(speciesInfo.jBrowseVcfUrlTemplate, 'Should have JBrowse VCF URL template');

      // Verify URL templates contain {release} placeholder
      assert(
        speciesInfo.jBrowseGffUrlTemplate.includes('{release}'),
        'GFF3 URL template should contain {release} placeholder'
      );
      assert(
        speciesInfo.jBrowseVcfUrlTemplate.includes('{release}'),
        'VCF URL template should contain {release} placeholder'
      );
    });

    it('should have correct S3 URL patterns for version 9.1.0', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090'); // Mouse

      // Verify S3 URL structure targets correct paths
      assert(speciesInfo.jBrowseGffUrlTemplate.includes('agrjbrowse/docker'), 'Should use agrjbrowse S3 bucket');
      assert(speciesInfo.jBrowseGffUrlTemplate.includes('MGI/mouse'), 'Should use correct species path for mouse');
      assert(speciesInfo.jBrowseGffUrlTemplate.endsWith('GFF_MGI.sorted.gff.gz'), 'Should target the sorted GFF3 file');
    });

    it('should support all Alliance species with JBrowse GFF3 URLs', () => {
      const testSpecies = [
        'NCBITaxon:9606', // Human
        'NCBITaxon:10090', // Mouse
        'NCBITaxon:7227', // Fly
        'NCBITaxon:6239', // Worm
        'NCBITaxon:559292', // Yeast
        'NCBITaxon:7955', // Zebrafish
        'NCBITaxon:10116', // Rat
        'NCBITaxon:8355', // X. laevis
        'NCBITaxon:8364', // X. tropicalis
      ];

      testSpecies.forEach((taxonId) => {
        const speciesInfo = getSpecies(taxonId);
        assert(speciesInfo.jBrowseGffUrlTemplate, `Species ${taxonId} should have JBrowse GFF3 URL`);
        assert(speciesInfo.jBrowseVcfUrlTemplate, `Species ${taxonId} should have JBrowse VCF URL`);
      });
    });

    it('should not have a jBrowseGffUrlTemplate for SARS-CoV-2 (no sorted GFF3 published yet, species being dropped)', () => {
      const speciesInfo = getSpecies('NCBITaxon:2697049');
      assert(!speciesInfo.jBrowseGffUrlTemplate, 'SARS-CoV-2 should intentionally have no jBrowseGffUrlTemplate');
    });

    it('should have species-specific S3 paths for different organisms', () => {
      const testCases = [
        { taxonId: 'NCBITaxon:10090', expectedPath: 'MGI/mouse' }, // Mouse
        { taxonId: 'NCBITaxon:7227', expectedPath: 'FlyBase/fruitfly' }, // Fly
        { taxonId: 'NCBITaxon:6239', expectedPath: 'WormBase/c_elegans_PRJNA13758' }, // Worm
        { taxonId: 'NCBITaxon:559292', expectedPath: 'SGD/yeast' }, // Yeast
      ];

      testCases.forEach(({ taxonId, expectedPath }) => {
        const speciesInfo = getSpecies(taxonId);
        assert(
          speciesInfo.jBrowseGffUrlTemplate.includes(expectedPath),
          `Species ${taxonId} should use path ${expectedPath}`
        );
      });
    });
  });

  describe('URL Construction', () => {
    it('should construct JBrowse URLs with version 9.1.0', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090');
      const releaseVersion = '9.1.0';

      // Test URL template replacement
      const gffUrl = speciesInfo.jBrowseGffUrlTemplate.replace('{release}', releaseVersion);
      const vcfUrl = speciesInfo.jBrowseVcfUrlTemplate.replace('{release}', releaseVersion);

      assert(gffUrl.includes('9.1.0'), 'GFF3 URL should contain version 9.1.0');
      assert(vcfUrl.includes('9.1.0'), 'VCF URL should contain version 9.1.0');
      assert(!gffUrl.includes('{release}'), 'GFF3 URL should not contain unresolved placeholder');
      assert(!vcfUrl.includes('{release}'), 'VCF URL should not contain unresolved placeholder');
    });

    it('should target correct S3 bucket and data structure', () => {
      const speciesInfo = getSpecies('NCBITaxon:7227'); // Fly
      const releaseVersion = '9.1.0';

      const gffUrl = speciesInfo.jBrowseGffUrlTemplate.replace('{release}', releaseVersion);
      const vcfUrl = speciesInfo.jBrowseVcfUrlTemplate.replace('{release}', releaseVersion);

      // Verify S3 structure
      assert(
        gffUrl === 'https://s3.amazonaws.com/agrjbrowse/docker/9.1.0/FlyBase/fruitfly/GFF_FB.sorted.gff.gz',
        'Should target correct S3 path for fly tabix GFF3 data'
      );
      assert(
        vcfUrl.includes('s3.amazonaws.com/agrjbrowse/VCF/9.1.0/FlyBase/fruitfly'),
        'Should target correct S3 path for fly VCF data'
      );
    });
  });

  describe('Migration Verification', () => {
    it('should use static file access pattern', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090');

      // Verify we're using static file URLs, not API endpoints
      assert(speciesInfo.jBrowseGffUrlTemplate.includes('s3.amazonaws.com'), 'Should use S3 static file URLs');
      assert(speciesInfo.jBrowseVcfUrlTemplate.includes('s3.amazonaws.com'), 'Should use S3 static file URLs for VCF');

      // Verify it doesn't contain Apollo patterns
      assert(!speciesInfo.jBrowseGffUrlTemplate.includes('/apollo/'), 'Should not contain Apollo server paths');
      assert(!speciesInfo.jBrowseVcfUrlTemplate.includes('/apollo/'), 'Should not contain Apollo server paths');
    });

    it('should provide version-aware configuration for every species with a GFF3 URL', () => {
      const speciesWithGff = [
        'NCBITaxon:9606',
        'NCBITaxon:10090',
        'NCBITaxon:7227',
        'NCBITaxon:6239',
        'NCBITaxon:559292',
        'NCBITaxon:7955',
        'NCBITaxon:10116',
        'NCBITaxon:8355',
        'NCBITaxon:8364',
        // NCBITaxon:2697049 (SARS-CoV-2) intentionally excluded - no GFF3 URL yet
      ];

      speciesWithGff.forEach((taxonId) => {
        const speciesInfo = getSpecies(taxonId);

        // All species should have version-aware URLs
        assert(
          speciesInfo.jBrowseGffUrlTemplate.includes('{release}'),
          `Species ${taxonId} GFF3 URL should be version-aware`
        );
        assert(
          speciesInfo.jBrowseVcfUrlTemplate.includes('{release}'),
          `Species ${taxonId} VCF URL should be version-aware`
        );
      });
    });

    it('should support fresh genomic data access (version 9.1.0 vs 9.0.0)', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090');

      // Test that version replacement works for both old and new versions
      const newVersionUrl = speciesInfo.jBrowseGffUrlTemplate.replace('{release}', '9.1.0');
      const oldVersionUrl = speciesInfo.jBrowseGffUrlTemplate.replace('{release}', '9.0.0');

      assert(newVersionUrl.includes('9.1.0'), 'Should support new data version 9.1.0');
      assert(oldVersionUrl.includes('9.0.0'), 'Should support old data version 9.0.0');
      assert(newVersionUrl !== oldVersionUrl, 'Different versions should generate different URLs');
    });
  });

  describe('Data Format Validation', () => {
    it('should target correct file formats for JBrowse', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090');

      // GFF3 URLs should target sorted, bgzip-compressed .gff.gz files (tabix .tbi index alongside)
      assert(speciesInfo.jBrowseGffUrlTemplate.endsWith('.sorted.gff.gz'), 'Should target sorted, bgzipped GFF3 file');

      // VCF URLs should target .vcf.gz files (when combined with filename)
      const vcfBaseUrl = speciesInfo.jBrowseVcfUrlTemplate.replace('{release}', '9.1.0');
      assert(vcfBaseUrl.endsWith('/'), 'VCF URL template should end with / for file appending');
    });

    it('should maintain existing Apollo configuration fields for compatibility', () => {
      const speciesInfo = getSpecies('NCBITaxon:7227'); // Fly

      // These fields should still exist for backward compatibility or other uses
      assert(speciesInfo.apolloName, 'Should maintain apolloName for species identification');
      assert(speciesInfo.apolloTrack, 'Should maintain apolloTrack for reference');

      // But JBrowse fields should be the primary data source
      assert(speciesInfo.jBrowseGffUrlTemplate, 'Should have JBrowse tabix GFF3 as primary data source');
    });
  });

  describe('Chromosome Prefix Logic', () => {
    // Test the chromosome prefix logic from genomeFeatureWrapper.js
    function applyChromosomePrefixLogic(apolloPrefix, chromosome) {
      let chrString = chromosome;
      if (apolloPrefix === 'yeast' && !chromosome.startsWith('chr')) {
        chrString = 'chr' + chromosome;
      }
      if (
        (apolloPrefix === 'x_laevis' || apolloPrefix === 'x_tropicalis') &&
        !chromosome.startsWith('Chr') &&
        !chromosome.toLowerCase().startsWith('sca')
      ) {
        chrString = 'Chr' + chromosome;
      }
      return chrString;
    }

    describe('Yeast chromosome prefixing', () => {
      it('should add chr prefix to bare yeast chromosomes', () => {
        const yeastChromosomes = [
          'I',
          'II',
          'III',
          'IV',
          'V',
          'VI',
          'VII',
          'VIII',
          'IX',
          'X',
          'XI',
          'XII',
          'XIII',
          'XIV',
          'XV',
          'XVI',
        ];

        yeastChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('yeast', chr);
          assert.strictEqual(result, `chr${chr}`, `Yeast chromosome ${chr} should become chr${chr}`);
        });
      });

      it('should NOT double-prefix yeast chromosomes that already have chr prefix', () => {
        const prefixedChromosomes = ['chrI', 'chrIV', 'chrXII', 'chrXVI', 'chrMito'];

        prefixedChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('yeast', chr);
          assert.strictEqual(result, chr, `Yeast ${chr} should remain unchanged (already prefixed)`);
        });
      });

      it('should handle yeast mitochondrial chromosome', () => {
        const result = applyChromosomePrefixLogic('yeast', 'Mito');
        assert.strictEqual(result, 'chrMito', 'Yeast mitochondrial chromosome should become chrMito');
      });
    });

    describe('X. laevis chromosome prefixing', () => {
      it('should add Chr prefix to bare X. laevis chromosomes', () => {
        const xlaevisChromosomes = [
          '1L',
          '1S',
          '2L',
          '2S',
          '3L',
          '3S',
          '4L',
          '4S',
          '5L',
          '5S',
          '6L',
          '6S',
          '7L',
          '7S',
          '8L',
          '8S',
          '9_10L',
          '9_10S',
        ];

        xlaevisChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('x_laevis', chr);
          assert.strictEqual(result, `Chr${chr}`, `X. laevis chromosome ${chr} should become Chr${chr}`);
        });
      });

      it('should NOT double-prefix X. laevis chromosomes that already have Chr prefix', () => {
        const prefixedChromosomes = ['Chr1L', 'Chr5S', 'Chr9_10L'];

        prefixedChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('x_laevis', chr);
          assert.strictEqual(result, chr, `X. laevis ${chr} should remain unchanged (already prefixed)`);
        });
      });

      it('should NOT add Chr prefix to X. laevis scaffold sequences', () => {
        const scaffolds = ['Scaffold1', 'Scaffold123', 'scaffold_ABC'];

        scaffolds.forEach((scaffold) => {
          const result = applyChromosomePrefixLogic('x_laevis', scaffold);
          assert.strictEqual(result, scaffold, `X. laevis ${scaffold} should remain unchanged`);
        });
      });
    });

    describe('Other species chromosome handling', () => {
      it('should NOT add chr prefix to human chromosomes', () => {
        const humanChromosomes = [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          'X',
          'Y',
          'MT',
        ];

        humanChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('human', chr);
          assert.strictEqual(result, chr, `Human chromosome ${chr} should remain unchanged`);
        });
      });

      it('should NOT add chr prefix to mouse chromosomes', () => {
        const mouseChromosomes = [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          'X',
          'Y',
          'MT',
        ];

        mouseChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('mouse', chr);
          assert.strictEqual(result, chr, `Mouse chromosome ${chr} should remain unchanged`);
        });
      });

      it('should NOT add chr prefix to fly chromosomes', () => {
        const flyChromosomes = ['2L', '2R', '3L', '3R', '4', 'X', 'Y'];

        flyChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('fly', chr);
          assert.strictEqual(result, chr, `Fly chromosome ${chr} should remain unchanged`);
        });
      });

      it('should NOT add chr prefix to worm chromosomes', () => {
        const wormChromosomes = ['I', 'II', 'III', 'IV', 'V', 'X'];

        wormChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('worm', chr);
          assert.strictEqual(result, chr, `Worm chromosome ${chr} should remain unchanged`);
        });
      });

      it('should NOT add chr prefix to zebrafish chromosomes', () => {
        const zebrafishChromosomes = [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
        ];

        zebrafishChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('zebrafish', chr);
          assert.strictEqual(result, chr, `Zebrafish chromosome ${chr} should remain unchanged`);
        });
      });

      it('should add Chr prefix to bare X. tropicalis chromosomes', () => {
        const xtropChromosomes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

        xtropChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('x_tropicalis', chr);
          assert.strictEqual(result, `Chr${chr}`, `X. tropicalis chromosome ${chr} should become Chr${chr}`);
        });
      });

      it('should NOT double-prefix X. tropicalis chromosomes that already have Chr prefix', () => {
        const prefixedChromosomes = ['Chr1', 'Chr5', 'Chr7', 'Chr10'];

        prefixedChromosomes.forEach((chr) => {
          const result = applyChromosomePrefixLogic('x_tropicalis', chr);
          assert.strictEqual(result, chr, `X. tropicalis ${chr} should remain unchanged (already prefixed)`);
        });
      });
    });
  });

  describe('URL Template Resolution', () => {
    function buildJBrowseUrls(speciesInfo, releaseVersion) {
      const gffUrl = speciesInfo.jBrowseGffUrlTemplate.replace('{release}', releaseVersion);
      const vcfTabixUrl = speciesInfo.jBrowseVcfUrlTemplate.replace('{release}', releaseVersion) + 'variants.vcf.gz';

      return { gffUrl, vcfTabixUrl };
    }

    it('should resolve {release} placeholder in the GFF3 URL template', () => {
      const speciesInfo = getSpecies('NCBITaxon:10090'); // Mouse
      const releaseVersion = '9.1.0';

      const { gffUrl } = buildJBrowseUrls(speciesInfo, releaseVersion);

      assert(gffUrl.endsWith('GFF_MGI.sorted.gff.gz'), 'Should resolve to the single sorted GFF3 file, not sharded');
      assert(!gffUrl.includes('{release}'), 'Should not contain unresolved {release} placeholder');
    });

    it('should construct a single-file GFF3 URL for yeast (no chromosome sharding)', () => {
      const speciesInfo = getSpecies('NCBITaxon:559292'); // Yeast
      const releaseVersion = '9.1.0';

      const { gffUrl } = buildJBrowseUrls(speciesInfo, releaseVersion);

      assert.strictEqual(gffUrl, 'https://s3.amazonaws.com/agrjbrowse/docker/9.1.0/SGD/yeast/GFF_SGD.sorted.gff.gz');
      assert(gffUrl.includes('SGD/yeast'), 'Should use correct species path for yeast');
    });

    it('should construct a single-file GFF3 URL for X. laevis (no chromosome sharding)', () => {
      const speciesInfo = getSpecies('NCBITaxon:8355'); // X. laevis
      const releaseVersion = '9.1.0';

      const { gffUrl } = buildJBrowseUrls(speciesInfo, releaseVersion);

      assert.strictEqual(
        gffUrl,
        'https://s3.amazonaws.com/agrjbrowse/docker/9.1.0/XenBase/x_laevis/GFF_XBXL.sorted.gff.gz'
      );
      assert(gffUrl.includes('XenBase/x_laevis'), 'Should use correct species path for X. laevis');
    });

    it('should generate complete and valid S3 URLs for each species', () => {
      const testCases = [
        { taxonId: 'NCBITaxon:10090', expectedPath: 'MGI/mouse', expectedFilename: 'GFF_MGI.sorted.gff.gz' },
        { taxonId: 'NCBITaxon:559292', expectedPath: 'SGD/yeast', expectedFilename: 'GFF_SGD.sorted.gff.gz' },
        { taxonId: 'NCBITaxon:7227', expectedPath: 'FlyBase/fruitfly', expectedFilename: 'GFF_FB.sorted.gff.gz' },
        {
          taxonId: 'NCBITaxon:6239',
          expectedPath: 'WormBase/c_elegans_PRJNA13758',
          expectedFilename: 'GFF_WB.sorted.gff.gz',
        },
      ];

      testCases.forEach(({ taxonId, expectedPath, expectedFilename }) => {
        const speciesInfo = getSpecies(taxonId);
        const releaseVersion = '9.1.0';

        const { gffUrl, vcfTabixUrl } = buildJBrowseUrls(speciesInfo, releaseVersion);

        // Verify URL structure
        assert(
          gffUrl.startsWith(`https://s3.amazonaws.com/agrjbrowse/docker/9.1.0/${expectedPath}`),
          `Should use correct S3 path for ${taxonId}`
        );
        assert(gffUrl.endsWith(expectedFilename), `Should target ${expectedFilename} for ${taxonId}`);
        assert(
          vcfTabixUrl.includes(`s3.amazonaws.com/agrjbrowse/VCF/9.1.0/${expectedPath}`),
          `Should use correct VCF path for ${taxonId}`
        );
      });
    });
  });
});
