// @flow

import type {State} from '/store';

export function getLocale(state: State) {
  return state.intl.locale;
}

export function getCurrentMessages(state: State) {
  return state.intl.messages[getLocale(state)] || {};
}
