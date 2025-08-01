import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

import ReactApp from '../reactApplication.jsx';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

global.scrollTo = jest.fn();

describe('ReactApp', () => {
  it('should be able to render to an HTML string', () => {
    const propertyDescriptors = Object.getOwnPropertyDescriptors(window);

    for (const key in propertyDescriptors) {
      propertyDescriptors[key].configurable = true;
    }

    const clonedWindow = Object.defineProperties({}, propertyDescriptors);

    clonedWindow.Event = window.Event;

    Object.defineProperty(clonedWindow, 'location', {
      value: {
        hostname: 'www.alliancegenome.org',
      },
    });

    global.window = clonedWindow;

    let htmlString = renderToString(<ReactApp router={MemoryRouter} />);
    assert.equal(typeof htmlString, 'string');
  });
});
