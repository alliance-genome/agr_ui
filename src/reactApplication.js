import React, { Component } from 'react';
import { Provider } from 'react-redux';
//import { useScroll } from 'react-router-scroll';
import configureStore from './lib/configureStore';
import ReactGA from 'react-ga';
import RouteListener from './components/routeListener';
import routes from './routes';

const isBrowser = (typeof window !== 'undefined');

if (isBrowser && window.location.hostname !== 'localhost') {
  ReactGA.initialize('UA-98765810-1');
}

function logPageView(location) {
  if (isBrowser) {
    let page = location.pathname + location.search;
    ReactGA.set({ page: page });
    ReactGA.pageview(page);
  }
}

class ReactApp extends Component {
  render() {
    let store = configureStore();
//    let routerMiddlware = [];
    if (isBrowser) {
    //  routerMiddlware.push(useScroll());
    }
    return (
      <Provider store={store}>
        <RouteListener onRouteChange={logPageView}>
          {routes}
        </RouteListener>
      </Provider>
    );
  }
}

export default ReactApp;
