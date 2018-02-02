// @flow

import type {State} from '../reducer';

declare var state: State;

// The shape of the state should be correctly inferred from the combined
// reducers.

// $ExpectError
(state: null);

(state.waygate.path: string);

// $ExpectError
(state.waygate.path: null);

// Access to opaque unsafe reducers should be an error.
// $ExpectError
(state.form: {});
