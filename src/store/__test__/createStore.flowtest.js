// @flow

import type {RouterHistory} from 'react-router-dom';
import createStore from '../';

// type Action = {type: 'FOO'};

declare class Context {
  fetch(string): Promise<string>;
}

type State = {foo: number};
type WrongState = {bar: string};
type Action = {type: 'FOO'};

declare var state: State;
declare var wrongState: WrongState;
declare var reducer: (state: State, action: Action) => State;
declare var wrongReducer: (state: WrongState, action: Action) => WrongState;
declare var context: Context;
declare var history: RouterHistory;

createStore({history, context, reducer});
createStore({history, context, reducer, state});

// $ExpectError
createStore({history: {}, context, reducer, state});

// $ExpectError
createStore({history, context, reducer, state: wrongState});

// $ExpectError
createStore({history, context, reducer: wrongReducer, state});

const store = createStore({
  history,
  context,
  reducer,
});

store.dispatch((dispatch, getState, context) => {
  context.fetch('url').then((res: string) => res);

  // The context type should propagate.
  // $ExpectError
  context.whatever;
  context
    // $ExpectError
    .fetch(null)
    // $ExpectError
    .then((res: number) => res);

  // The redux state type should propagate.
  getState().foo;

  (getState().foo: number);
  // $ExpectError
  (getState().foo: string);
  // $ExpectError
  getState().whatever;

  // The redux dispatch type should propagate.
  dispatch({type: 'FOO'});
  // $ExpectError
  dispatch({type: 'BAR'});
  return [];
});

(store.dispatch((dispatch) => {
  // $ExpectError
  (dispatch(() => 'val'): number);

  return 5;
  // $ExpectError
}): string);

// The return value of the inner thunk should propagate out.
store.dispatch(
  (dispatch) =>
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
                        dispatch((dispatch) => dispatch(() => undefined)),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
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
                        context
                          // $ExpectError
                          .fetch(null)
                          // $ExpectError
                          .then((res: number) => res);

                        // The redux state type should propagate.
                        getState().foo;

                        (getState().foo: number);
                        // $ExpectError
                        (getState().foo: string);
                        // $ExpectError
                        getState().whatever;

                        // The redux dispatch type should propagate.
                        dispatch({type: 'FOO'});
                        // $ExpectError
                        dispatch({type: 'BAR'});
                        return [];
                      }),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  ),
).length;
