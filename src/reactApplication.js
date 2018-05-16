import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
//import { useScroll } from 'react-router-scroll';
import configureStore from './lib/configureStore';
import ReactGA from 'react-ga';
import routes from './routes';

const isBrowser = (typeof window !== 'undefined');

if (isBrowser && window.location.hostname !== 'localhost') {
  ReactGA.initialize('UA-98765810-1');
}

// function logPageView() {
//   if (isBrowser) {
//     let page = window.location.pathname + window.location.search;
//     ReactGA.set({ page: page });
//     ReactGA.pageview(page);
//   }
// }

class ReactApp extends Component {
  render() {
    let store = configureStore();
//    let routerMiddlware = [];
    if (isBrowser) {
    //  routerMiddlware.push(useScroll());
    }
    return (
      <Provider store={store}>
        <Router
          //onUpdate={logPageView}
        >
          {routes}
        </Router>
      </Provider>
    );
  }
}

export default ReactApp;
