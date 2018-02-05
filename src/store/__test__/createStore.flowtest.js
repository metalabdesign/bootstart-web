// @flow

import type {Store} from '../createStore';

type Action = {type: 'FOO'};
type State = {foo: number};
type Context = {|fetch(string): Promise<string>|};

declare var store: Store<State, Action, Context>;

// The return value of the inner thunk should propagate out.
store.dispatch((dispatch) =>
  dispatch((dispatch) =>
    dispatch((dispatch) =>
      dispatch((dispatch) =>
        dispatch((dispatch) =>
          dispatch((dispatch) =>
            dispatch((dispatch) =>
              dispatch((dispatch) =>
                dispatch((dispatch) =>
                  dispatch((dispatch) =>
                    dispatch((dispatch) =>
                      dispatch((dispatch) =>
                        dispatch(() => undefined)
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
  // $ExpectError
).length;

store.dispatch((dispatch) =>
  dispatch((dispatch) =>
    dispatch((dispatch) =>
      dispatch((dispatch) =>
        dispatch((dispatch) =>
          dispatch((dispatch) =>
            dispatch((dispatch) =>
              dispatch((dispatch) =>
                dispatch((dispatch) =>
                  dispatch((dispatch) =>
                    dispatch((dispatch) =>
                      dispatch((dispatch, getState, context) => {
                        context.fetch('url').then((res: string) => res);

                        // The context type should propagate.
                        // $ExpectError
                        context.whatever;
                        // $ExpectError
                        context.fetch(null)
                          // $ExpectError
                          .then((res: number) => res);

                        // The redux state type should propagate.
                        getState().foo;
                        // $ExpectError
                        getState().whatever;

                        // The redux dispatch type should propagate.
                        dispatch({type: 'FOO'});
                        // $ExpectError
                        dispatch({type: 'BAR'});
                        return [];
                      })
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
).length;
