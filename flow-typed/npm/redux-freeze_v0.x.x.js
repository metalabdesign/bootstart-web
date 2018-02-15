// flow-typed signature: 48f658870425948aa6aa4b57464b089f
// flow-typed version: <<STUB>>/redux-freeze_v0/flow_v0.63.1

declare module 'redux-freeze' {
  import type {MiddlewareAPI} from 'redux';

  declare module.exports: {
    <S, A, D>(api: MiddlewareAPI<S, A, D>): (next: D) => D;
  };
}
