import React from 'react';
import { render } from '@testing-library/react';
import Menu from './Menu';
import LinkRenderProvider from './link-render-provider/LinkRenderProvider';
import LinkRenderDefault from './link-render-provider/LinkRenderDefault';

describe('Menu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LinkRenderProvider renderLink={LinkRenderDefault}>
        <Menu />
      </LinkRenderProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
