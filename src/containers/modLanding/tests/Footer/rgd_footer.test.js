import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FooterAlt from "../../FooterAlt";
import {MODContent} from '../../content';
import { getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

const content = MODContent['rgd'];

describe('Rat footer tests', () => {
    beforeEach(() => {
       render(<FooterAlt  link={content.link}
                links={content.footer}
                note={content.footerNote}
                footerStyle={content.footerStyle}
                logoImgSrc={content.logoImgSrc}
                titleBarStyle={content.titleBarStyle}
                modShortName={content.modShortName}/>)
    });

     it('Should render hex with link to mod main page, name ', () => {
        const top_div = screen.getByTestId("footer_div");
        const top_link = screen.getByTestId("footer_link");
        const link_img = screen.getByTestId("footer_hex")
        const top_label = screen.getByTestId("modname_footer");

        expect(top_div).toContainElement(top_link);
        expect(top_link).toHaveAttribute('href', "https://rgd.mcw.edu/");

        expect(top_div).toContainElement(top_label);
        expect(top_label).toHaveTextContent("RGD");
        
        expect(top_link).toContainElement(link_img);     
        expect(link_img).toHaveAttribute('src', "alliance_logo_rgd.png");
     });

   it('should render the correct hrefs with correct label in correct order from content.js', () => {
    
    for (let i=0; i<content.footer.length; i++){

         let footer = screen.getByTestId("href_footer_" + i);
         expect(footer).toHaveAttribute('href', content.footer[i][1]);

         let label = screen.getByTestId('footer_label_' + i)
         expect(label).toContainHTML(content.footer[i][0]);
        }
   });

   // Sanity check in case content.js gets corrupted.
   // Check for something we expect to be there.
   if('Should render citing RGD Downloads as the first footer link', () => {
      const footer = screen(getByTestId("href_footer_0")); // First item
      expect(footer).toHaveAttribute('href', 'https://download.rgd.mcw.edu/data_release');
      const label = screen.getByTestId('footer_label_0')
      expect(label).toContainHTML('RGD Downloads');
   });





});

