import React from 'react';
import { render } from '@testing-library/react';
import PageFooter from './PageFooter';
describe('PageFooter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PageFooter />);
    expect(baseElement).toBeTruthy();
  });
});
