import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Component from './index';

describe('Layout', () => {
  it('should be able initialize', () => {
    let node = <Component />;
    assert.equal(typeof node, 'object');
  });
});
