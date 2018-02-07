// @flow

// Import modules ==============================================================
import {combineReducers} from 'redux';
import type {Reducer as ReduxReducer} from 'redux';
import {reducer as form} from 'redux-form';
import {routerReducer as router} from 'react-router-redux';

// Import actions ==============================================================
import type {Action} from '/action';

// Imported reducer functions that are missing types will default to unsafe any
// in our state. Use this type to cast the return type to mixed which will warn
// us about potential access, i.e. make the reducer properly opaque.
type UnsafeReducer = (*, *) => mixed;

const reducers = {
  form: (form: UnsafeReducer),
  router,
};

const reducer = combineReducers(reducers);

export default (reducer: ReduxReducer<$Call<typeof reducer>, Action>);
