import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';

import ReactApp from '../reactApplication';

describe('ReactApp', () => {
  it('should be able to render to an HTML string', () => {
    global.window = {
      location: {
        hostname: 'www.alliancegenome.org'
      }
    };
    let htmlString = renderToString(
      <ReactApp router={MemoryRouter} />
    );
    assert.equal(typeof htmlString, 'string');
  });
});
