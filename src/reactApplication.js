import React, { Component } from 'react';
import { Router, browserHistory, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './lib/configureStore';

import routes from './routes';

class ReactApp extends Component {
  render() {
    let isBrowser = (typeof browserHistory === 'object');
    let historyObj = isBrowser ? browserHistory : createMemoryHistory('/');
    let store = configureStore(historyObj);
    let history = syncHistoryWithStore(historyObj, store);
    return (
      <Provider store={store}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default ReactApp;
