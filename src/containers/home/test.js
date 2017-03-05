import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Component from './index';

describe('Home', () => {
  it('should be able to render to an HTML string', () => {
    let htmlString = renderToString(<Component />);
    assert.equal(typeof htmlString, 'string');
  });
});
