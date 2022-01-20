import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Resources from "../../Resources";
import {MODContent} from '../../content';
import { getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

const content = MODContent['rgd'];

describe('RGD Resources', () => {
    beforeEach(() => {
       render(<Resources links={content.resources}
                         sectionStyle={content.sectionStyle}/>)
    });

     it('Should render hex with link to mod main page, name ', () => {
        const top_div = screen.getByTestId("resources_topdiv");
        const header = screen.getByTestId("resources_header");
        const link_div = screen.getByTestId("resources_link_div")
        const link = screen.getByTestId("href_resources_0");

        expect(top_div).toContainElement(header);
        expect(header).toHaveTextContent("Resources");

        expect(top_div).toContainElement(link_div);
        
        expect(link_div).toContainElement(link);     
     });

   it('should render the correct hrefs with correct label in correct order from content.js', () => {
    
    for (let i=0; i<content.resources.length; i++){

         let resources = screen.getByTestId("href_resources_" + i);
         expect(resources).toHaveAttribute('href', content.resources[i][1]);

         let label = screen.getByTestId('resources_label_' + i)
         expect(label).toContainHTML(content.resources[i][0]);
        }
   });

   // Sanity check in case content.js gets corrupted.
   // Check for something we expect to be there.
   // RGD Gene Search should always be the first one.?
   if('Should render RGD Gene Search as the first footer link', () => {
      const footer = screen(getByTestId("href_resources_0")); // First item
      expect(footer).toHaveAttribute('href', 'https://rgd.mcw.edu/rgdweb/search/genes.html');
      const label = screen.getByTestId('resources_label_0')
      expect(label).toContainHTML('RGD Gene Search');
   });





});

