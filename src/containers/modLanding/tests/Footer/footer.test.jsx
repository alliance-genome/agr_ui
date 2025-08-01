import React from 'react';
import FooterAlt from '../../FooterAlt.jsx';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const defaultContent = {
  link: 'https://example.org',
  modShortName: 'TestMod',
  titleBarStyle: '',
  footerStyle: '',
  logoImgSrc: 'modLogo.png',
  footer: [
    ['', 'Citing TestMod', 'https://example.org'],
    ['youtube', ' TestMod YouTube', 'https://example.org'],
    ['', '', ''],
    ['', 'TestMod FAQ', 'https://example.org'],
  ],
  footerNote: 'TestMod footer note',
};

describe('MOD footer tests', () => {
  beforeEach(() => {
    render(
      <FooterAlt
        link={defaultContent.link}
        links={defaultContent.footer}
        note={defaultContent.footerNote}
        footerStyle={defaultContent.footerStyle}
        logoImgSrc={defaultContent.logoImgSrc}
        titleBarStyle={defaultContent.titleBarStyle}
        modShortName={defaultContent.modShortName}
      />
    );
  });

  it('Should render hex with link to mod main page, name ', () => {
    const top_div = screen.getByTestId('footer_div');
    const top_link = screen.getByTestId('footer_link');
    const link_img = screen.getByTestId('footer_hex');
    const top_label = screen.getByTestId('modname_footer');

    expect(top_div).toContainElement(top_link);
    expect(top_link).toHaveAttribute('href', defaultContent.link);

    expect(top_div).toContainElement(top_label);
    expect(top_label).toHaveTextContent(defaultContent.modShortName);

    expect(top_link).toContainElement(link_img);
    expect(link_img).toHaveAttribute('src', defaultContent.logoImgSrc);
  });

  it('should render the correct hrefs with correct label in correct order from content.jsx', () => {
    for (let i = 0; i < defaultContent.footer.length; i++) {
      let footer = screen.getByTestId('href_footer_' + i);
      expect(footer).toHaveAttribute('href', defaultContent.footer[i][2]);

      let label = screen.getByTestId('footer_label_' + i);
      expect(label).toContainHTML(defaultContent.footer[i][1]);
    }
  });
});
