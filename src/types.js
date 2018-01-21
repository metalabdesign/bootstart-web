/* @flow */
import type {Reducer} from '/reducer';
import type {Store as $Store} from 'redux';

export type Action = {};

// =============================================================================
// Import context.
// =============================================================================
// import type {ClientContext} from '/client/context';
// import type {ServerContext} from '/server/middleware/context';

export type Context = any;

export type State = $ObjMap<Reducer, <V>(v: (...args: any) => V) => V>;
// eslint-disable-next-line no-use-before-define
export type Dispatch = (action: Action | ThunkAction) => any;
export type GetState = () => State;
export type ThunkAction = (
  dispatch: Dispatch,
  getState: GetState,
  context: Context,
) => any;
export type Store = $Store<State, Action>;
export type Module = {
  hot?: {
    accept: (x: string, f: Function) => void,
  },
};

export type WebpackStats = {
  assets: Array<any>,
  chunks: Array<any>,
  hash: string,
  publicPath: string,
};

export type Asset = {
  url: string,
  name: string,
  chunkName: string,
};

export type AssetMap = {
  [string]: Array<Asset>,
};
