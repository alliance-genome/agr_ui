import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Title from '../../Title.jsx';
import { MODContent } from '../../content.jsx';
import { getByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const content = MODContent['wormbase'];

describe('WormBase Title', () => {
  const members = ['wormbase', 'flybase', 'rgd', 'mgd', 'goc', 'sgd', 'zfin'];
  members.forEach((element) => {
    it('Should render hex with link to ' + element + ' main page, name ', () => {
      let content = MODContent[element];
      render(
        <Title
          bannerStyle={content.bannerStyle}
          titleBarStyle={content.titleBarStyle}
          logoImgSrc={content.logoImgSrc}
          modFullName={content.modFullName}
        />
      );

      const top_div = screen.getByTestId('title_div');
      const hex_img = screen.getByTestId('title_hex');
      const text = screen.getByTestId('title_text');
      const banner = screen.getByTestId('title_banner');

      expect(banner).toContainElement(top_div);

      expect(top_div).toContainElement(hex_img);
      expect(hex_img).toHaveAttribute('alt', 'hex_' + content.modFullName);

      expect(top_div).toContainElement(text);
      // sgd has html italics in the full name so this test would fail for it.
      if (element != 'sgd') {
        expect(text).toHaveTextContent(content.modFullName);
      }
      //const banner_style = window.getComputedStyle(banner);
    });
  });
});
