// @flow

// Import modules ==============================================================
import type {RouterHistory} from 'react-router-dom';
import typeof Reducer from '/reducer';

import type {
  ThunkAction as _ThunkAction,
  Store as _Store,
  Dispatch as _Dispatch,
} from '/store';

import type {Action} from '/action';

// Export allowed actions for use in reducers.
export type {Action};

// Export state shape for use in selectors.
export type State = $Call<Reducer, *, *>;

// Export store signature expected by connected components and thunk actions.
export type Context = {history: RouterHistory};
export type ThunkAction<T> = _ThunkAction<State, Action, Context, T>;
export type Dispatch = _Dispatch<State, Action, Context>;
export type Store = _Store<State, Action, Context>;
