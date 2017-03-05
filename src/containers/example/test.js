import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Example from './index';

describe('Example', () => {
  it('should be able to render to an HTML string', () => {
    let htmlString = renderToString(<Example />);
    assert.equal(typeof htmlString, 'string');
  });
});
