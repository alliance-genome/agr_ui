import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';  // useful for dispatching async actions
import assignIn from 'lodash.assignin';

// custom reducers
import reducers from '../reducers';

const configureStore = () => {
  let combinedReducers = combineReducers(assignIn(reducers, {}));

  // to work with redux-devtools-extension (such as the chrome extension)
  let composeEnhancers;
  try {
    // include in try block so mocha test doesn't complain about ReferenceError
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 25
    }) ||
      compose;
  } catch (e) {
    composeEnhancers = compose;
  }

  let store = createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(reduxThunk))
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
