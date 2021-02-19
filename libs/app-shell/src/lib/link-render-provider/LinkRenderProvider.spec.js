import React from 'react';
import { render } from '@testing-library/react';
import LinkRenderProvider from './LinkRenderProvider';
describe('LinkRenderProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LinkRenderProvider />);
    expect(baseElement).toBeTruthy();
  });
});
