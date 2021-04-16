import React from 'react';
import { render } from '@testing-library/react';
import MODThemeProvider from './MODThemeProvider';
describe('MODThemeProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MODThemeProvider />);
    expect(baseElement).toBeTruthy();
  });
});
