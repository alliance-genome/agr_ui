import React from 'react';
import { render, screen } from '@testing-library/react';
import useGeneOrthology from '../../hooks/useGeneOrthology';
import OrthologyFilteredTable from './orthologyFilteredTable.jsx';

jest.mock('../../hooks/useGeneOrthology');

test('renders a stable empty state when bounded orthology paging fails', () => {
  useGeneOrthology.mockReturnValue({ data: undefined, isLoading: false, isError: true });

  render(<OrthologyFilteredTable geneId="MGI:1" />);

  expect(screen.getByText('No data available')).toBeInTheDocument();
});
