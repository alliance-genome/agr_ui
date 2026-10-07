import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SequencePanel from '../sequencePanelWrapper.jsx';
import { GenericGeneSeqPanel } from 'generic-sequence-panel';
import { getSpecies } from '../../../lib/utils';

jest.mock('generic-sequence-panel', () => ({
  GenericGeneSeqPanel: jest.fn(() => <div data-testid="generic-gene-seq-panel" />),
}));

jest.mock('../../../lib/utils', () => ({
  getSpecies: jest.fn(() => ({
    apolloName: 'mouse',
    jBrowseName: 'Mus musculus',
    jBrowseGffUrlTemplate: 'https://s3.amazonaws.com/agrjbrowse/docker/{release}/MGI/mouse/GFF_MGI.sorted.gff.gz',
    jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001635.27_GRCm39_genomic.fna.gz',
  })),
}));

const mockUseRelease = jest.fn(() => ({
  isLoading: false,
  isError: false,
  data: { releaseVersion: '8.2.0' },
}));

jest.mock('../../../hooks/ReleaseContextProvider.jsx', () => ({
  useRelease: () => mockUseRelease(),
}));

describe('SequencePanel', () => {
  const defaultProps = {
    species: 'NCBITaxon:10090',
    gene: 'MGI:12345',
    refseq: '1',
    start: 1000,
    end: 2000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRelease.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { releaseVersion: '8.2.0' },
    });
  });

  it('renders GenericGeneSeqPanel with a resolved gffurl instead of nclistbaseurl/urltemplate', () => {
    render(<SequencePanel {...defaultProps} />);

    const call = GenericGeneSeqPanel.mock.calls.at(-1)[0];
    expect(call).toEqual(
      expect.objectContaining({
        gffurl: 'https://s3.amazonaws.com/agrjbrowse/docker/8.2.0/MGI/mouse/GFF_MGI.sorted.gff.gz',
        fastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001635.27_GRCm39_genomic.fna.gz',
      })
    );
    expect(call).not.toHaveProperty('nclistbaseurl');
    expect(call).not.toHaveProperty('urltemplate');
  });

  it('renders NoData without calling GenericGeneSeqPanel when refseq is missing', () => {
    render(<SequencePanel {...defaultProps} refseq={undefined} />);

    expect(GenericGeneSeqPanel).not.toHaveBeenCalled();
  });

  it('renders NoData without calling GenericGeneSeqPanel when the species has no jBrowseGffUrlTemplate', () => {
    getSpecies.mockReturnValueOnce({
      apolloName: 'SARS-CoV-2',
      jBrowseName: 'SARS-CoV-2',
      jBrowsefastaurl: 'https://s3.amazonaws.com/agrjbrowse/fasta/GCF_000001405.40_GRCh38.p14_genomic.fna.gz',
    });

    render(<SequencePanel {...defaultProps} species="NCBITaxon:2697049" />);

    expect(GenericGeneSeqPanel).not.toHaveBeenCalled();
  });
});
