// @flow

// Import modules ==============================================================
import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {reducer as waygate} from 'waygate';

// Imported reducer functions that are missing types will default to unsafe any
// in our state. Use this type to cast the return type to mixed which will warn
// us about potential access, i.e. make the reducer properly opaque.
type UnsafeReducer = (*, *) => mixed;

const reducers = {
  form: (form: UnsafeReducer),
  waygate,
};

export type State = $ObjMap<typeof reducers, <S>((S, *) => S) => S>;

export default combineReducers(reducers);
