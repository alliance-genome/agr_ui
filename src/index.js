import React from 'react';
import { render } from 'react-dom';
import 'bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-select/dist/react-select.css';
import '@geneontology/ribbon/lib/index.css';
import './style.scss';
import './ribbon.scss';

import ReactApp from './reactApplication';

function main() {
  render(
    <ReactApp />,
    document.getElementById('app')
  );
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
