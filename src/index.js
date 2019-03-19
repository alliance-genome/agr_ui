import '@babel/polyfill';
import 'custom-event-polyfill';

import React from 'react';
import { render } from 'react-dom';
import * as analytics from './lib/analytics';
import 'bootstrap';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import '@geneontology/ribbon/lib/index.css';
import 'genomefeaturecomponent/src/GenomeFeatureViewer.css';
import './style.scss';

import ReactApp from './reactApplication';

analytics.initialize();

render(
  <ReactApp />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
