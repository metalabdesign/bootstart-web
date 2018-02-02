// @flow

// Import modules ==============================================================
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {compose, identity} from 'ramda';

// Import actions ==============================================================
import type {Action} from '/action';

// Import reducers =============================================================
import reducer from '/reducer';
import type {State} from '/reducer';

export type Dispatch<A, G, C> = {
  (A): A,
  <T>((Dispatch<A, G, C>, G, C) => T): T;
};

export type Store<S, A, C> = {
  dispatch: Dispatch<A, () => S, C>,
  getState(): S,
  subscribe(() => void): () => void,
  replaceReducer((S, A) => S): void,
};

export default <C: {initialState?: State}>(context: C) => {
  const enhancer = compose(
    applyMiddleware(thunkMiddleware.withExtraArgument(context)),
    identity,
  );

  const store: Store<State, Action, C> = context.initialState
    ? createStore(reducer, context.initialState, enhancer)
    : createStore(reducer, enhancer);

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      // eslint-disable-next-line no-console
      console.log('🚒  Hot reload reducers');
      store.replaceReducer(require('../reducer').default);
    });
  }

  return Object.freeze({...context, store});
};
