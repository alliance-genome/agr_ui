import React, { Component } from 'react';
import { Router, applyRouterMiddleware, browserHistory, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { useScroll } from 'react-router-scroll';
import configureStore from './lib/configureStore';
import ReactGA from 'react-ga';
import routes from './routes';

const isBrowser = (typeof window !== 'undefined');

if (isBrowser && window.location.hostname !== 'localhost') {
  ReactGA.initialize('UA-98765810-1');
}

function logPageView() {
  if (isBrowser) {
    let page = window.location.pathname + window.location.search;
    ReactGA.set({ page: page });
    ReactGA.pageview(page);
  }
}

class ReactApp extends Component {
  render() {
    let historyObj = isBrowser ? browserHistory : createMemoryHistory('/');
    let store = configureStore(historyObj);
    let history = syncHistoryWithStore(historyObj, store);
    let routerMiddlware = [];
    if (isBrowser) {
      routerMiddlware.push(useScroll());
    }
    return (
      <Provider store={store}>
        <Router history={history}
                onUpdate={logPageView}
                render={applyRouterMiddleware(...routerMiddlware)}
        >
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default ReactApp;
