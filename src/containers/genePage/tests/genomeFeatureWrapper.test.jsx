import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenomeFeatureWrapper from '../genomeFeatureWrapper';
import { fetchTabixVcfData, fetchNCListData } from 'genomefeatures';

// Mock the genomefeatures module
jest.mock('genomefeatures', () => ({
  GenomeFeatureViewer: jest.fn().mockImplementation(function () {
    this.generateLegend = () => '<div>Legend</div>';
    this.setSelectedAlleles = jest.fn();
    this.closeModal = jest.fn();
    return this;
  }),
  fetchNCListData: jest.fn(),
  fetchTabixVcfData: jest.fn(),
  parseLocString: jest.fn((str) => {
    const [chr, range] = str.split(':');
    const [start, end] = range.split('..');
    return { chromosome: chr, start: parseInt(start), end: parseInt(end) };
  }),
}));

// Mock getSpecies utility
jest.mock('../../../lib/utils', () => ({
  getSpecies: jest.fn(() => ({
    apolloName: 'mouse',
    jBrowseName: 'Mus musculus',
    jBrowsenclistbaseurltemplate: 'https://s3.amazonaws.com/agrjbrowse/docker/{release}/MGI/mouse/',
    jBrowseVcfUrlTemplate: 'https://s3.amazonaws.com/agrjbrowse/VCF/{release}/MGI/mouse/',
    jBrowsetracks: ',All_Genes',
  })),
  getSingleGenomeLocation: jest.fn(() => ({
    chromosome: '1',
    start: 1000000,
    end: 2000000,
  })),
  makeId: jest.fn((str) => str.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')),
}));

// Mock hooks - will be overridden per test as needed
const mockUseRelease = jest.fn(() => ({
  isLoading: false,
  isError: false,
  data: { releaseVersion: '8.2.0' },
}));

jest.mock('../../../hooks/ReleaseContextProvider', () => ({
  useRelease: () => mockUseRelease(),
}));

describe('GenomeFeatureWrapper VCF Error Handling', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockUseRelease.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { releaseVersion: '8.2.0' },
    });
  });

  const defaultProps = {
    id: 'test-viewer',
    primaryId: 'MGI:12345',
    geneSymbol: 'TestGene',
    species: 'NCBITaxon:10090',
    chromosome: '1',
    fmin: 1000000,
    fmax: 2000000,
    displayType: 'ISOFORM_AND_VARIANT',
    genomeLocationList: [
      {
        chromosome: '1',
        start: 1000000,
        end: 2000000,
        strand: '+',
      },
    ],
    assembly: 'GRCm39',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock implementations
    fetchNCListData.mockResolvedValue([]);
    fetchTabixVcfData.mockResolvedValue([]);
  });

  test('should not show VCF error when VCF loads successfully', async () => {
    const { container } = render(<GenomeFeatureWrapper {...defaultProps} />);

    await waitFor(() => {
      expect(fetchTabixVcfData).toHaveBeenCalled();
    });

    // Should not find the error alert
    const errorAlert = container.querySelector('.alert.alert-danger');
    expect(errorAlert).not.toBeInTheDocument();
  });

  test('should show VCF error alert when VCF loading fails', async () => {
    // Mock VCF loading to fail
    fetchTabixVcfData.mockRejectedValue(new Error('404 Not Found'));

    const { container } = render(<GenomeFeatureWrapper {...defaultProps} />);

    await waitFor(() => {
      expect(fetchTabixVcfData).toHaveBeenCalled();
    });

    // Should find the error alert
    const errorAlert = container.querySelector('.alert.alert-danger');
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent('Variant data could not be loaded');
    expect(errorAlert).toHaveTextContent('Please refresh the page to try again');
    expect(errorAlert).toHaveTextContent('help@alliancegenome.org');
  });

  test('should not show VCF error for ISOFORM display type', async () => {
    // Mock VCF loading to fail
    fetchTabixVcfData.mockRejectedValue(new Error('404 Not Found'));

    const isoformProps = {
      ...defaultProps,
      displayType: 'ISOFORM', // Not ISOFORM_AND_VARIANT
    };

    const { container } = render(<GenomeFeatureWrapper {...isoformProps} />);

    await waitFor(() => {
      expect(fetchNCListData).toHaveBeenCalled();
    });

    // Should not find the error alert for ISOFORM display type
    const errorAlert = container.querySelector('.alert.alert-danger');
    expect(errorAlert).not.toBeInTheDocument();
  });

  test('should not attempt to load VCF data for ISOFORM display type', async () => {
    const isoformProps = {
      ...defaultProps,
      displayType: 'ISOFORM',
    };

    render(<GenomeFeatureWrapper {...isoformProps} />);

    await waitFor(() => {
      expect(fetchNCListData).toHaveBeenCalled();
    });

    // VCF loading should not be attempted for ISOFORM display type
    expect(fetchTabixVcfData).not.toHaveBeenCalled();
  });

  test('should include help email link in error message', async () => {
    // Mock VCF loading to fail
    fetchTabixVcfData.mockRejectedValue(new Error('Network error'));

    render(<GenomeFeatureWrapper {...defaultProps} />);

    await waitFor(() => {
      expect(fetchTabixVcfData).toHaveBeenCalled();
    });

    // Check for the email link
    const emailLink = screen.getByRole('link', { name: 'help@alliancegenome.org' });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:help@alliancegenome.org');
  });

  test('should handle VCF error with custom error message', async () => {
    // Mock VCF loading to fail with specific error
    const customError = new Error('CORS policy blocked request');
    fetchTabixVcfData.mockRejectedValue(customError);

    const { container } = render(<GenomeFeatureWrapper {...defaultProps} />);

    await waitFor(() => {
      expect(fetchTabixVcfData).toHaveBeenCalled();
    });

    // Should still show the generic user-friendly message
    const errorAlert = container.querySelector('.alert.alert-danger');
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent('Variant data could not be loaded');
  });

  test('should not attempt to load VCF when release version is unknown', async () => {
    // Clear any environment variable that might override the release version
    const originalEnv = process.env.REACT_APP_JBROWSE_AGR_RELEASE;
    delete process.env.REACT_APP_JBROWSE_AGR_RELEASE;

    // Set mock to return unknown release version
    mockUseRelease.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { releaseVersion: 'unknown' },
    });

    render(<GenomeFeatureWrapper {...defaultProps} />);

    await waitFor(() => {
      expect(fetchNCListData).toHaveBeenCalled();
    });

    // VCF loading should not be attempted
    expect(fetchTabixVcfData).not.toHaveBeenCalled();

    // Should not show error alert
    const errorAlert = screen.queryByRole('alert');
    expect(errorAlert).not.toBeInTheDocument();

    // Restore environment variable
    if (originalEnv) {
      process.env.REACT_APP_JBROWSE_AGR_RELEASE = originalEnv;
    }
  });

  test('should handle general loading error differently from VCF error', async () => {
    // Mock NCList loading to fail (general error)
    fetchNCListData.mockRejectedValue(new Error('General loading error'));

    const { container } = render(<GenomeFeatureWrapper {...defaultProps} />);

    await waitFor(() => {
      expect(fetchNCListData).toHaveBeenCalled();
    });

    // Should show the general error message, not the VCF-specific one
    const generalError = screen.getByText('Unable to retrieve data');
    expect(generalError).toBeInTheDocument();
    expect(generalError).toHaveClass('text-danger');

    // Should not show the VCF-specific alert
    const vcfAlert = container.querySelector('.alert.alert-danger');
    expect(vcfAlert).not.toBeInTheDocument();
  });
});
