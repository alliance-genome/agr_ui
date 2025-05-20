import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FooterAlt from "../../FooterAlt";
import {MODContent} from '../../content';
import { getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

const content = MODContent['zfin'];

describe('ZebraFish footer tests', () => {
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
        expect(top_link).toHaveAttribute('href', "https://zfin.org");

        expect(top_div).toContainElement(top_label);
        expect(top_label).toHaveTextContent("ZFIN");

        expect(top_link).toContainElement(link_img);
        expect(link_img).toHaveAttribute('src', "alliance_logo_zfin.png");
     });

   it('should render the correct hrefs with correct label in correct order from content.js', () => {

    for (let i=0; i<content.footer.length; i++){

         let footer = screen.getByTestId("href_footer_" + i);
         expect(footer).toHaveAttribute('href', content.footer[i][2]);

         let label = screen.getByTestId('footer_label_' + i)
         expect(label).toContainHTML(content.footer[i][1]);
        }
   });

   // Sanity check in case content.js gets corrupted.
   // Check for something we expect to be there.
   if('Should render Zebrafish Anatomy / GO / Human Disease as the first footer link', () => {
      const footer = screen(getByTestId("href_footer_0")); // First item
      expect(footer).toHaveAttribute('href', 'https://zfin.org/action/ontology/search');
      const label = screen.getByTestId('footer_label_0')
      expect(label).toContainHTML('Zebrafish Anatomy / GO / Human Disease');
   });





});

