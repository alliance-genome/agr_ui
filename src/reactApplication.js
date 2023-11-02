import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './lib/configureStore';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logPageView } from './lib/analytics';
import RouteListener from './components/routeListener';
import routes from './routes';
import { ScrollContext } from 'react-router-scroll-4';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReleaseContextProvider from './hooks/ReleaseContextProvider';

const isBrowser = (typeof window !== 'undefined');
const store = configureStore();

const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity,
  }
};

const queryClient = new QueryClient();

class ReactApp extends Component {
  render() {
    const Router = this.props.router || BrowserRouter;
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReleaseContextProvider>
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
          </ReleaseContextProvider>
        </QueryClientProvider>
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
