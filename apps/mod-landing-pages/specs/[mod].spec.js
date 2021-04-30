import React from 'react';
import { render } from '@testing-library/react';
import Index from '../pages/[mod]';
describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Index mod="wormbase" />);
    expect(baseElement).toBeTruthy();
  });
});
