import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import _ from 'underscore';

// custom reducers
import reducers from '../reducers';

const configureStore = (history) => {
  let combinedReducers = combineReducers(_.extend(reducers, { routing: routerReducer }));
  let store = createStore(
    combinedReducers,
    compose(applyMiddleware(routerMiddleware(history)))
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
