import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

import ReactApp from '../reactApplication';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

global.scrollTo = jest.fn();

describe('ReactApp', () => {
  it('should be able to render to an HTML string', () => {
    let htmlString = renderToString(
      <ReactApp router={MemoryRouter} />
    );
    assert.equal(typeof htmlString, 'string');
  });
});
