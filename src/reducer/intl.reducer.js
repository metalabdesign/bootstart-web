// @flow

// =============================================================================
// Import modules.
// =============================================================================
import {combineReducers} from 'redux';

// =============================================================================
// Import errors.
// =============================================================================
// import type SerializableError from '/error/SerializableError';

// =============================================================================
// Import actions.
// =============================================================================
import type {Action} from '/types';

const defaultLocale: string = process.env.DEFAULT_LOCALE || 'en';

function locale(state: string = defaultLocale, action: Action) {
  switch (action.type) {
  case 'intl/LOCALE_LOAD_ENDED': return action.payload.locale;
  default: return state;
  }
}

function messages(state: {[string]: ?{[string]: string}} = {}, action: Action) {
  switch (action.type) {
  case 'intl/LOCALE_LOAD_ENDED':
    return {
      ...state,
      [action.payload.locale]: action.payload.messages,
    };
  default: return state;
  }
}

function loadingLocale(state: string | null = null, action: Action) {
  switch (action.type) {
  case 'intl/LOCALE_LOAD_STARTED': return action.payload.locale;
  case 'intl/LOCALE_LOAD_ENDED': return null;
  case 'intl/LOCALE_LOAD_FAILED': return null;
  default: return state;
  }
}

function error(state: SerializableError<*> | null = null, action: Action) {
  switch (action.type) {
  case 'intl/LOCALE_LOAD_STARTED': return null;
  case 'intl/LOCALE_LOAD_FAILED': return action.payload;
  default: return state;
  }
}

export default combineReducers({
  locale,
  messages,
  loadingLocale,
  error,
});
