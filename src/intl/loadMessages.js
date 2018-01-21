import {memoize} from 'ramda';

/**
 * Load a set of translated messages for a specific locale. The new message
 * data is fulfilled with the promise. It can then be supplied to a react-intl
 * `<IntlProvider>` instance.
 *
 * This function is memoized to return the same Promise instance for any given
 * locale string.
 *
 * @param   {String} locale - A locale string, e.x. `en-US`.
 * @returns {Promise} - A Promise.
 */
const loadMessages = memoize((locale) => {
  // The app default messages are defined in `en`. There is no external
  // translation for these messages.
  if (locale === 'en') {
    return Promise.resolve();
  }
  return import(`../../intl/messages/${locale}.yml`);
});

export default loadMessages;
