import '@babel/polyfill';
import 'custom-event-polyfill';

import React from 'react';
import { render } from 'react-dom';
import * as analytics from './lib/analytics';
import 'bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import '@geneontology/ribbon/lib/index.css';
import 'agr_genomefeaturecomponent/src/GenomeFeatureViewer.css';
import './style.scss';

import ReactApp from './reactApplication';

import { applyPolyfills, defineCustomElements } from '@geneontology/wc-ribbon-strips/loader';

analytics.initialize();

render(
  <ReactApp />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}

applyPolyfills().then(() => {
  defineCustomElements(window);
});