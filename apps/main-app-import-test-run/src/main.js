// polyfills
import 'core-js';
import 'regenerator-runtime/runtime';
import 'custom-event-polyfill';
import 'whatwg-fetch';
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';

import React from 'react';
import { render } from 'react-dom';
import * as analytics from './lib/analytics';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'agr_genomefeaturecomponent/src/GenomeFeatureViewer.css';
import './style.scss';

import ReactApp from './reactApplication';

import {
  applyPolyfills,
  defineCustomElements,
} from '@geneontology/wc-ribbon-strips/loader';
import {
  applyPolyfills as applyPolyfills2,
  defineCustomElements as defineCustomElements2,
} from '@geneontology/wc-ribbon-table/loader';

analytics.initialize();

render(<ReactApp />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

applyPolyfills().then(() => {
  defineCustomElements(window);
});

applyPolyfills2().then(() => {
  defineCustomElements2(window);
});
