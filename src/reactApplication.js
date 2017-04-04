import React, { Component } from 'react';
import { Router, applyRouterMiddleware, browserHistory, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import configureStore from './lib/configureStore';

import routes from './routes';

class ReactApp extends Component {
  render() {
    let isBrowser = (typeof window !== 'undefined');
    let historyObj = isBrowser ? browserHistory : createMemoryHistory('/');
    let store = configureStore(historyObj);
    let history = syncHistoryWithStore(historyObj, store);
    let routerMiddlware = [];
    if (isBrowser) {
      routerMiddlware.push(useScroll());
    }
    return (
      <Provider store={store}>
        <Router history={history} render={applyRouterMiddleware(...routerMiddlware)}>
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default ReactApp;
