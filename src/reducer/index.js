// @flow

// =============================================================================
// Import modules.
// =============================================================================
import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {reducer as waygate} from 'waygate';

const reducer = {
  waygate,
  form,
};

export type Reducer = typeof reducer;

export default combineReducers(reducer);
