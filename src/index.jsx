// polyfills
import 'core-js';
import 'regenerator-runtime/runtime';
import 'custom-event-polyfill';
import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import * as analytics from './lib/analytics';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import './css/genomefeatures.css';
import './style.scss';

import ReactApp from './reactApplication.jsx';
import { defineCustomElements } from '@geneontology/web-components/loader';

analytics.initialize();

const domInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
// React 19 no longer exports findDOMNode; backfill for third-party libs (e.g. react-transition-group via react-bootstrap-table).
if (!ReactDOM.findDOMNode && domInternals?.findDOMNode) {
  ReactDOM.findDOMNode = domInternals.findDOMNode;
}

ReactDOMClient.createRoot(document.getElementById('app')).render(<ReactApp />);

if (import.meta.hot) {
  import.meta.hot.accept();
}

defineCustomElements();
