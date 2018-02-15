// flow-typed signature: e77a435cdd6d81fcc5ceee8067076567
// flow-typed version: <<STUB>>/webpack-udev-server_v0.x.x/flow_v0.64.0

declare type $npm$WebpackUdevServer$Action = {|
  type: string,
  payload?: any,
  meta?: any,
  error?: boolean,
|};

declare type $npm$WebpackUdevServer$Hub = {
  dispatch: (a: $npm$WebpackUdevServer$Action) => void,
  subscribe: (p: Array<string> | string, s: (a: $npm$WebpackUdevServer$Action) => void) => () => void,
  demand: (input: $npm$WebpackUdevServer$Action, fn: (a: $npm$WebpackUdevServer$Action) => void) => () => void,
  provide: (p: string, c: (a: $npm$WebpackUdevServer$Action, p: (a: $npm$WebpackUdevServer$Action) => void) => void) => () => void,
  url: string,
};

declare var __webpack_udev_hub__: $npm$WebpackUdevServer$Hub | void;

declare module 'webpack-udev-server/createFileWatcher' {
  declare export default (path: string, options?: {hub?: $npm$WebpackUdevServer$Hub}) => {
    poll(options?: {timeout?: number}): Promise<Buffer>,
  };
}

declare module 'webpack-udev-server' {
  declare export type Hub = $npm$WebpackUdevServer$Hub;
}
