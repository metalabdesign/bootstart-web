// @flow

// Import modules ==============================================================
import {createStore as create, applyMiddleware} from 'redux';
// import type {Reducer} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {compose, identity} from 'ramda';
import {routerMiddleware} from 'react-router-redux';
import type {RouterHistory} from 'react-router-dom';

export type ThunkAction<S, A, C, T> = (Dispatch<S, A, C>, () => S, C) => T;

export type Dispatch<S, A, C> = {
  (A): A,
  <T>(ThunkAction<S, A, C, T>): T,
};

export type Store<S, A, C> = {
  dispatch: Dispatch<S, A, C>,
  getState(): S,
  subscribe(() => void): () => void,
  replaceReducer((S, A) => S): void,
};

function createStore<C, S, A: {type: string}, R: (state: S, action: A) => S>({
  context,
  history,
  reducer,
  state,
}: {
  history: RouterHistory,
  context: C,
  reducer: R,
  state?: S,
}): Store<S, A, C> {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware.withExtraArgument(context),
      routerMiddleware(history),
      ...(__DEV__ ? [require('redux-freeze')] : []),
    ),
    identity,
  );

  const store =
    state !== undefined
      ? create(reducer, state, enhancer)
      : create(reducer, enhancer);

  return store;
}

export default createStore;
