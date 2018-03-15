// @flow
import {error, compose, status, header, send, next, App} from 'midori';
import {readFileSync} from 'fs';
import path from 'path';
import {renderError} from '/render';

/**
 * Try to handle errors using the app's error root.
 * @returns {App} Midori app.
 */
export const handleAppError = (): App =>
  error(async (error, req) => {
    const {markup, status: statusCode} = await renderError({
      stats: req.stats,
      path: req.url,
      error,
    });
    return compose(
      status(statusCode),
      header('Content-Type', 'text/html; charset=utf-8'),
      send(markup),
    );
  });

/**
 * @returns {String} Markup.
 */
const getEmergencyErrorMarkup = (): string => {
  return readFileSync(
    path.join('dist', 'client', 'error', '500', 'index.html'),
    'utf8',
  );
};

/**
 * If everything fails then return an HTTP 500 with a static pre-rendered
 * error page for production. Fallback to the default error handler when in
 * development mode.
 * @returns {App} Midori app.
 */
export const handleEmergencyError = (): App => {
  if (__DEV__) {
    return next;
  }
  const markup = getEmergencyErrorMarkup();
  return error(() => {
    return compose(
      status(500),
      header('Content-Type', 'text/html; charset=utf-8'),
      send(markup),
    );
  });
};

export default (): App => compose(handleAppError(), handleEmergencyError());
