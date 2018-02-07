// @flow

import type {Location} from 'react-router-dom';

import typeof Reducer from '../reducer';

declare var state: $Call<Reducer, *, *>;

// The shape of the state should be correctly inferred from the combined
// reducers.

// $ExpectError
(state: null);

(state.router.location: null | Location);

// $ExpectError
(state.router.location: string);

// Access to opaque unsafe reducers should be an error.
// $ExpectError
(state.form: {});
