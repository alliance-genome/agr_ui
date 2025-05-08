import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Search from "../../Search";
import {MODContent} from '../../content';
import { getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

const content = MODContent['flybase'];

describe('FlyBase Search', () => {
    beforeEach(() => {
       render(<Search links={content.search}
                      sectionStyle={content.sectionStyle}/>)
    });

    it('Should render section title and link to alliance search for species ', () => {
       const top_div = screen.getByTestId("search_topdiv");
       const header = screen.getByTestId("search_header");
       const link_div = screen.getByTestId("search_link_div")
       const link = screen.getByTestId("href_search_0");

       expect(top_div).toContainElement(header);
       expect(header).toHaveTextContent("Search");

       expect(top_div).toContainElement(link_div);
       
       expect(link_div).toContainElement(link);     
    });

    it('should render the correct hrefs with correct label in correct order from content.js', () => {
        for (let i=0; i<content.search.length; i++){
            let search = screen.getByTestId("href_search_" + i);
            expect(search).toHaveAttribute('href', content.search[i][1]);

            let label = screen.getByTestId('search_label_' + i)
            expect(label).toContainHTML(content.search[i][0]);
        }
    });

    // Sanity check in case content.js gets corrupted.
    // Check for something we expect to be there.
    // D. melanogaster should always be the first one.
    if('Should render D. melanogaster search as the first search link', () => {
       const footer = screen(getByTestId("href_search_0")); // First item
       expect(footer).toHaveAttribute('href', 'search?species=Drosophila melanogaster&category=gene');
       const label = screen.getByTestId('search_label_0')
       expect(label).toContainHTML('<i>D. melanogaster</i>');
    });
});

