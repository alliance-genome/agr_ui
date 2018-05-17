import React, { Component } from 'react';
import { Provider } from 'react-redux';
//import { useScroll } from 'react-router-scroll';
import configureStore from './lib/configureStore';
import { BrowserRouter } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import PropTypes from 'prop-types';
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
    const Router = this.props.router || BrowserRouter;
    return (
      <Provider store={store}>
        <Router>
          {
            isBrowser ?
              <ScrollContext>
                <RouteListener onRouteChange={logPageView}>
                  {routes}
                </RouteListener>
              </ScrollContext> :
              routes
          }
        </Router>
      </Provider>
    );
  }
}

ReactApp.propTypes = {
  router: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
};

export default ReactApp;
