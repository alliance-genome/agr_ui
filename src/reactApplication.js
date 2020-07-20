import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './lib/configureStore';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logPageView } from './lib/analytics';
import RouteListener from './components/routeListener';
import routes from './routes';
import { ScrollContext } from 'react-router-scroll-4';

const isBrowser = (typeof window !== 'undefined');
const store = configureStore();

class ReactApp extends Component {
  render() {
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
