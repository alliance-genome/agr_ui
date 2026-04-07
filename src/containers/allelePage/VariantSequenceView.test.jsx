import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import VariantSequenceView from './VariantSequenceView.jsx';

const mockGenomeFeatureWrapper = jest.fn(() => <div data-testid="genome-feature-wrapper" />);

jest.mock('../genePage/genomeFeatureWrapper.jsx', () => (props) => mockGenomeFeatureWrapper(props));

describe('VariantSequenceView', () => {
  beforeEach(() => {
    mockGenomeFeatureWrapper.mockClear();
  });

  test('passes overlapping gene metadata to GenomeFeatureWrapper', () => {
    const variantData = {
      id: 'NC_003279.8:g.10765226C>T',
      synonyms: ['variant-synonym'],
      variants: [
        {
          id: 'VAR:123',
          taxon: {
            curie: 'NCBITaxon:9606',
          },
          curatedVariantGenomicLocations: [
            {
              start: 10765226,
              end: 10765226,
              overlapGenes: [
                {
                  curie: 'HGNC:7765',
                  geneSymbol: {
                    displayText: 'NF1',
                  },
                  geneGenomicLocationAssociations: [
                    {
                      start: 31094927,
                      end: 31382116,
                      strand: '-',
                      geneGenomicLocationAssociationObject: {
                        name: '17',
                      },
                    },
                  ],
                  taxon: {
                    species: {
                      assembly_curie: 'GRCh38',
                    },
                  },
                },
              ],
              variantGenomicLocationAssociationObject: {
                name: '17',
              },
            },
          ],
        },
      ],
    };

    render(<VariantSequenceView variant={variantData} />);

    expect(mockGenomeFeatureWrapper).toHaveBeenCalledTimes(1);
    const props = mockGenomeFeatureWrapper.mock.calls[0][0];
    expect(props).toEqual(
      expect.objectContaining({
        chromosome: '17',
        geneSymbol: 'NF1',
        primaryId: 'HGNC:7765',
        species: 'NCBITaxon:9606',
        fmin: 10765226,
        fmax: 31382116,
        genomeLocationList: [
          expect.objectContaining({
            chromosome: '17',
            start: 31094927,
            end: 31382116,
          }),
        ],
      })
    );
  });

  test('falls back to legacy gene data when overlapGenes are absent', () => {
    const variantData = {
      id: 'VAR:456',
      gene: {
        modEntityId: 'HGNC:7',
        symbol: 'A2M',
        genomeLocations: [
          {
            chromosome: '12',
            start: 9067664,
            end: 9116229,
            strand: '+',
            assembly: 'GRCh38',
          },
        ],
      },
      variants: [
        {
          id: 'VARIANT:456',
          taxon: {
            curie: 'NCBITaxon:9606',
          },
          curatedVariantGenomicLocations: [
            {
              start: 9070000,
              end: 9070001,
              variantGenomicLocationAssociationObject: {
                name: '12',
              },
            },
          ],
        },
      ],
    };

    render(<VariantSequenceView variant={variantData} />);

    expect(mockGenomeFeatureWrapper).toHaveBeenCalledTimes(1);
    const props = mockGenomeFeatureWrapper.mock.calls[0][0];
    expect(props).toEqual(
      expect.objectContaining({
        geneSymbol: 'A2M',
        primaryId: 'HGNC:7',
        genomeLocationList: [
          expect.objectContaining({
            chromosome: '12',
            start: 9067664,
            end: 9116229,
          }),
        ],
      })
    );
  });
});
