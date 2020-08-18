import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

// custom reducers
import reducers from '../reducers';

const configureStore = () => {
  let combinedReducers = combineReducers(reducers);

  // to work with redux-devtools-extension (such as the chrome extension)
  let composeEnhancers;
  try {
    // include in try block so mocha test doesn't complain about ReferenceError
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
      compose;
  } catch (e) {
    composeEnhancers = compose;
  }

  let store = createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware())
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
