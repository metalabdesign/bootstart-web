import {addLocaleData} from 'react-intl';
import {memoize} from 'ramda';

// Remove the country code from a locale identifier.
export const parseLanguage = (locale) => locale.split('-')[0];

/**
 * Load a locale data set for `react-intl`. The loaded data is automatically
 * provided to `react-intl` through `addLocaleData`. No additional action is
 * necessary.
 *
 * Locale data is hosted in async webpack chunks. Webpack's `require.ensure` is
 * used to universally handle the request for both client and server.
 *
 * This function is memoized to return the same Promise instance for any given
 * language string.
 *
 * This function is defined separately from `loadReactIntlLocaleData` to allow
 * memoization based on a parsed language value.
 *
 * @param   {String} language - A languauge string, without country, e.x. `en`.
 * @returns {Promise} - A Promise.
 */
export const loadReactIntlLocaleDataForLanguage = memoize((language) => {
  if (language === 'en') {
    return Promise.resolve();
  }
  return import(`react-intl/locale-data/${language}.js`).then((data) => {
    addLocaleData(data);
    return Promise.resolve(data);
  });
});

/**
 * Load a locale data set for `react-intl`. The loaded data is automatically
 * provided to `react-intl` through `addLocaleData`. No additional action is
 * necessary.
 *
 * Locale data is hosted in async webpack chunks. Webpack's `require.ensure` is
 * used to universally handle the request for both client and server.
 *
 * @param   {String} locale - A locale string, e.x. `en-US`.
 * @returns {Promise} - A Promise.
 */
export const loadReactIntlLocaleData = (locale) => {
  // react-intl categorizes locale data by language only, the country code  of
  // the locale string is not considered.
  return loadReactIntlLocaleDataForLanguage(parseLanguage(locale));
};

/**
 * Load a locale data set for the `Intl` polyfill. The loaded data self-injects
 * into the global `Intl` instance provided by the polyfill. No additional
 * action is necessary.
 *
 * This function is memoized to return the same Promise instance for any given
 * locale string.
 *
 * @param   {String} locale - A locale string, e.x. `en-US`.
 * @returns {Promise} - A Promise.
 */
export const loadPolyfillLocaleData = memoize((locale) => {
  if (!global.IntlPolyfill) {
    // The environment has a built in `Intl` object. Or we are in a server
    // build. It is not necessary to load additional locale data.
    // (The Intl polyfill bundles all locale data for node-targeded builds.)
    return Promise.resolve();
  }
  return import(`intl/locale-data/jsonp/${locale}.js`);
});

/**
 * Load any initial locale data required for the current locale.
 *
 * @param   {String} locale - A locale string, e.x. `en-US`.
 * @returns {Promise} - A Promise.
 */
const loadLocaleData = (locale) => Promise.all([
  loadReactIntlLocaleData(locale),
  loadPolyfillLocaleData(locale),
]);

export default loadLocaleData;
