import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './lib/configureStore';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import RouteListener from './components/routeListener';
import routes from './routes';
import { ScrollContext } from 'react-router-scroll-4';
import ScrollToTop from './components/scrollToTop';

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
    const ChosenScrollContext = isBrowser && window.chrome ? ScrollContext : ScrollToTop;

    const Router = this.props.router || BrowserRouter;
    return (
      <Provider store={store}>
        <Router>
          {
            isBrowser ?
              <ChosenScrollContext>
                <RouteListener onRouteChange={logPageView}>
                  {routes}
                </RouteListener>
              </ChosenScrollContext> :
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
