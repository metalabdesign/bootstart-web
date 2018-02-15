// flow-typed signature: e96cae6441ff5c327a29ba0503fcf051
// flow-typed version: <<STUB>>/history_v4/flow_v0.63.1

declare type $npm$history$GetUserConfirmation =
  (message: string, callback: (boolean) => void) => mixed;

declare module 'history/createBrowserHistory' {
  import type {RouterHistory} from 'react-router-dom';

  declare export type GetUserConfirmation = $npm$history$GetUserConfirmation;

  declare export default (props?: {
    getUserConfirmation?: GetUserConfirmation,
    baseName?: string,
    forceRefresh?: boolean,
    forceRefresh?: boolean,
    keyLength?: number,
  }) => RouterHistory;
}

declare module 'history/createHashHistory' {
  import type {RouterHistory} from 'react-router-dom';

  declare export type HashType = 'hashbang' | 'noslash' | 'slash';
  declare export type GetUserConfirmation = $npm$history$GetUserConfirmation;

  declare export default (props?: {
    getUserConfirmation?: GetUserConfirmation,
    baseName?: string,
    hashType?: HashType,
  }) => RouterHistory;
}

declare module 'history/createMemoryHistory' {
  import type {RouterHistory} from 'react-router-dom';

  declare export type GetUserConfirmation = $npm$history$GetUserConfirmation;

  declare export type MemoryHistory = RouterHistory & {
    index: number,
    entries: Array<Location>
  };

  declare export default (props?: {
    getUserConfirmation?: GetUserConfirmation,
    initialEntries?: Array<string>,
    initialIndex?: number,
    keyLength?: number,
  }) => MemoryHistory;
}

declare module 'history/LocationUtils' {
  import type {Location, LocationShape} from 'react-router-dom';

  declare export var createLocation: (
    path: string | LocationShape,
    state: any,
    key?: string,
    currentLocation?: LocationShape
  ) => Location;

  declare export var locationsAreEqual:
    (a: LocationShape, b: LocationShape) => boolean;
}

declare module 'history/PathUtils' {
  import type {Location, LocationShape} from 'react-router-dom';

  declare export var addLeadingSlash: (path: string) => string;
  declare export var stripLeadingSlash: (path: string) => string;
  declare export var hasBasename: (path: string, prefix: string) => boolean;
  declare export var stripBasename: (path: string, prefix: string) => string;
  declare export var parsePath: (path: string) => Location;
  declare export var createPath: (location: LocationShape) => string;
}

declare module 'history' {
  declare export type GetUserConfirmation = $npm$history$GetUserConfirmation;

  declare export {
    default as createBrowserHistory,
  } from 'history/createBrowserHistory';

  declare export {
    default as createHashHistory,
  } from 'history/createHashHistory';

  declare export {
    default as createMemoryHistory,
  } from 'history/createMemoryHistory';

  declare export {
    createLocation,
    locationsAreEqual,
  } from 'history/LocationUtils';

  declare export {parsePath, createPath} from 'history/PathUtils';
}
