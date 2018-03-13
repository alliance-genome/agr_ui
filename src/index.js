import React from 'react';
import { render } from 'react-dom';

import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './public/public.css'; // ./public/public.css uses a special loader, refer to webpack config

import ReactApp from './reactApplication';

function main() {
  render(<ReactApp />, document.getElementById('app'));
}

function browserSupportsAllFeatures() {
  return window.Promise && window.fetch && window.Symbol;
}

if (browserSupportsAllFeatures()) {
  // Browsers that support all features run `main()` immediately.
  main();
} else {
  // All other browsers loads polyfills and then run `main()`.
  require(['babel-polyfill'], () => {
    main();
  });
}
