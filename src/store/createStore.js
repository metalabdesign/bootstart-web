/* @flow */
import {createStore as reduxCreateStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {compose, identity} from 'ramda';

// =============================================================================
// Import reducers.
// =============================================================================
import reducer from '/reducer';

import type {Store, State, Context} from '/types';

const createEnhancer = (context: Context) => compose(
  applyMiddleware(
    thunkMiddleware.withExtraArgument(context),
  ),
  identity,
);

const createStore = (initialState: State): Store => {
  const store = reduxCreateStore(reducer, initialState, createEnhancer());

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('../reducer', () => {
      console.log('🚒  Hot reloading reducers.'); // eslint-disable-line
      store.replaceReducer(require('../reducer').default);
    });
  }

  return store;
};

export default createStore;
