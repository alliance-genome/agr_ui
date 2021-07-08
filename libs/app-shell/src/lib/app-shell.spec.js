import React from 'react';
import { render } from '@testing-library/react';
import AppShell from './app-shell';
describe('AppShell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppShell />);
    expect(baseElement).toBeTruthy();
  });
});
