// flow-typed signature: 1d912656c748d4e91cc7786695139485
// flow-typed version: <<STUB>>/redux-thunk_v2/flow_v0.63.1

declare module 'redux-thunk' {
  import type {Middleware, MiddlewareAPI} from 'redux';

  declare export default {
    <S, A, D>(api: MiddlewareAPI<S, A, D>): (next: D) => D;
    withExtraArgument<S, A, D>(mixed): Middleware<S, A, D>,
  };
}
