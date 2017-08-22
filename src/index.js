import React from 'react';
import { render } from 'react-dom';

import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './public/public.css'; // ./public/public.css uses a special loader, refer to webpack config

import ReactApp from './reactApplication';

render(<ReactApp />, document.getElementById('app'));
