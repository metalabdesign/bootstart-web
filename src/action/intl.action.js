// @flow

// =============================================================================
// Import modules.
// =============================================================================
import {loadLocaleData, loadMessages} from '/intl';
import {canUseDOM} from 'fbjs/lib/ExecutionEnvironment';

// =============================================================================
// Import utils.
// =============================================================================
// import {makeSerializable} from '/util/error.util';

// =============================================================================
// Import errors.
// =============================================================================
// import type SerializableError from '/error/SerializableError';

// =============================================================================
// Import store.
// =============================================================================
import type {ThunkAction} from '/types';

export type LocaleLoadStartedAction = {
  type: 'intl/LOCALE_LOAD_STARTED',
  payload: {locale: string},
};

export type LocaleLoadEndedAction = {
  type: 'intl/LOCALE_LOAD_ENDED',
  payload: {
    locale: string,
    messages: {[string]: string},
  },
};
export type LocaleLoadFailedAction = {
  type: 'intl/LOCALE_LOAD_FAILED',
  // payload: SerializableError<*>,
};

export function loadLocale(locale: string): ThunkAction {
  return (dispatch) => {
    dispatch({
      type: 'intl/LOCALE_LOAD_STARTED',
      payload: {locale},
    });

    return Promise.all([
      loadMessages(locale),
      loadLocaleData(locale),
    ]).then(
      ([messages]) => {
        if (canUseDOM) {
          // eslint-disable-next-line no-undef
          const html = document.documentElement;
          if (html) {
            html.setAttribute('lang', locale);
          }
          // TODO: Set a cookie to persist locale for subsequent requests.
        }
        dispatch({
          type: 'intl/LOCALE_LOAD_ENDED',
          payload: {locale, messages},
        });
      },
      (error) => {
        dispatch({
          type: 'intl/LOCALE_LOAD_FAILED',
          // payload: makeSerializable(error),
        });

        return Promise.reject(error);
      }
    );
  };
}
