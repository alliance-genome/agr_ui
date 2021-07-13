import React from 'react';
import { render } from '@testing-library/react';
import PageFooter from './PageFooter';
import LinkRenderProvider from './link-render-provider/LinkRenderProvider';
import LinkRenderDefault from './link-render-provider/LinkRenderDefault';

describe('PageFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LinkRenderProvider renderLink={LinkRenderDefault}>
        <PageFooter />
      </LinkRenderProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
