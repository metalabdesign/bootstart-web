// flow-typed signature: 888ec6699c8a37c94dcb59d47269b7fd
// flow-typed version: <<STUB>>/react-router-redux_v5/flow_v0.63.1

declare module 'react-router-redux/actions' {
  declare export var CALL_HISTORY_METHOD: '@@router/CALL_HISTORY_METHOD';

  declare export type PushAction = {
    type: typeof CALL_HISTORY_METHOD,
    payload: {method: 'push'}
  };
  declare export type ReplaceAction = {
    type: typeof CALL_HISTORY_METHOD,
    payload: {method: 'replace'}
  };
  declare export type GoAction = {
    type: typeof CALL_HISTORY_METHOD,
    payload: {method: 'go'}
  };
  declare export type GoBackAction = {
    type: typeof CALL_HISTORY_METHOD,
    payload: {method: 'goBack'}
  };
  declare export type GoForwardAction = {
    type: typeof CALL_HISTORY_METHOD,
    payload: {method: 'goForward'}
  };

  declare export type Action =
    | PushAction
    | ReplaceAction
    | GoAction
    | GoBackAction
    | GoForwardAction
  ;

  declare export var push: () => PushAction;
  declare export var replace: () => ReplaceAction;
  declare export var go: () => GoAction;
  declare export var goBack: () => GoBackAction;
  declare export var goForward: () => GoForwardAction;

  declare export var routerActions: {
    push: typeof push,
    replace: typeof replace,
    go: typeof go,
    goBack: typeof goBack,
    goForward: typeof goForward,
  };
}

declare module 'react-router-redux/ConnectedRouter' {
  import type {RouterHistory} from 'react-router-dom';

  declare export default class ConnectedRouter<S, A, D>
    extends React$Component<{
      history: RouterHistory,
      store?: Store<S, A, D>,
      children?: React$Node,
      isSSR?: boolean,
    }> {}
}

declare module 'react-router-redux/middleware' {
  import type {RouterHistory} from 'react-router-dom';
  import type {Middleware} from 'redux';

  declare export default function
    routerMiddleware<S, A, D>(history: RouterHistory): Middleware<S, A, D>;
}

declare module 'react-router-redux/reducer' {
  import type {Location} from 'react-router-dom';

  declare export type RouterState = {location: Location | null};

  declare export var LOCATION_CHANGE: "@@router/LOCATION_CHANGE";
  declare export var routerReducer: <A>(state: any, action: A) => RouterState;
}

declare module 'react-router-redux/selectors' {
  import type {Match} from 'react-router-dom';

  import type {RouterState} from 'react-router-redux/reducer';

  declare export var getLocation:
    (state: {router: RouterState}) => Location;
  declare export var createMatchSelector:
    (path: string) => (state: {router: RouterState}) => Match;
}

declare module 'react-router-redux' {
  import type {Action as _Action} from 'react-router-redux/actions';
  declare export type Action = _Action;

  declare export {
    CALL_HISTORY_METHOD,
    push,
    replace,
    go,
    goBack,
    goForward,
    routerActions,
  } from 'react-router-redux/actions';

  declare export {
    default as ConnectedRouter,
  } from 'react-router-redux/ConnectedRouter';

  declare export {
    default as routerMiddleware,
  } from 'react-router-redux/middleware';

  declare export {
    LOCATION_CHANGE,
    routerReducer,
  } from 'react-router-redux/reducer';

  declare export {
    getLocation,
    createMatchSelector,
  } from 'react-router-redux/selectors';
}
