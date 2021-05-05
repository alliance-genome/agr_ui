import React from 'react';
import { render } from '@testing-library/react';
import NewsListItem from './news-list-item';
describe('NewsListItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewsListItem />);
    expect(baseElement).toBeTruthy();
  });
});
