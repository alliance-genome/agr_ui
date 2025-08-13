import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import nextRootReducer from '../reducers/index';

// custom reducers
import reducers from '../reducers';

const configureStore = () => {
  const combinedReducers = combineReducers(reducers);

  // to work with redux-devtools-extension (such as the chrome extension)
  let composeEnhancers;
  try {
    // include in try block so mocha test doesn't complain about ReferenceError
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } catch (e) {
    composeEnhancers = compose;
  }

  const store = createStore(combinedReducers, composeEnhancers(applyMiddleware()));
  if (import.meta.hot) {
    // Enable Webpack hot module replacement for reducers
    import.meta.hot.accept('../reducers', () => {
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
