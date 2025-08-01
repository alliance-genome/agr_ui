import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Search from '../../Search.jsx';
import { MODContent } from '../../content.jsx';
import { getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const content = MODContent['mgd'];

describe('MGD Search', () => {
  beforeEach(() => {
    render(<Search links={content.search} sectionStyle={content.sectionStyle} />);
  });

  it('Should render section title and link to alliance search for species ', () => {
    const top_div = screen.getByTestId('search_topdiv');
    const header = screen.getByTestId('search_header');
    const link_div = screen.getByTestId('search_link_div');
    const link = screen.getByTestId('href_search_0');

    expect(top_div).toContainElement(header);
    expect(header).toHaveTextContent('Search');

    expect(top_div).toContainElement(link_div);

    expect(link_div).toContainElement(link);
  });

  it('should render the correct hrefs with correct label in correct order from content.jsx', () => {
    for (let i = 0; i < content.search.length; i++) {
      let search = screen.getByTestId('href_search_' + i);
      expect(search).toHaveAttribute('href', content.search[i][1]);

      let label = screen.getByTestId('search_label_' + i);
      expect(label).toContainHTML(content.search[i][0]);
    }
  });

  // Sanity check in case content.jsx gets corrupted.
  // Check for something we expect to be there.
  // M. musculus should always be the first one.
  if (
    ('Should render M. musculus search as the first search link',
    () => {
      const footer = screen(getByTestId('href_search_0')); // First item
      expect(footer).toHaveAttribute('href', 'search?species=Mus musculus&category=gene');
      const label = screen.getByTestId('search_label_0');
      expect(label).toContainHTML('<i>M. musculus</i>');
    })
  );
});
