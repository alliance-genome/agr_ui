// polyfills
// import '@geneontology/web-components';
// import '@geneontology/web-components/dist/components/go-annotation-ribbon-strips.js';
import.meta.glob(
  './node_modules/@geneontology/web-components/dist/components/*.js',
  { eager: true }
);
import { defineCustomElements } from '@geneontology/web-components/loader';

import 'core-js';
import 'regenerator-runtime/runtime';
import 'custom-event-polyfill';
import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as analytics from './lib/analytics';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './css/genomefeatures.css';
import './style.scss';

import ReactApp from './reactApplication.jsx';


defineCustomElements(window);
analytics.initialize();

ReactDOM.createRoot(document.getElementById('app')).render(<ReactApp />);

if (import.meta.hot) {
  import.meta.hot.accept();
}



