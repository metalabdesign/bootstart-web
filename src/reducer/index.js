// @flow

// =============================================================================
// Import modules.
// =============================================================================
import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {reducer as waygate} from 'waygate';

import intl from './intl.reducer';

const reducer = {
  waygate,
  form,
  intl,
};

export type Reducer = typeof reducer;

export default combineReducers(reducer);
