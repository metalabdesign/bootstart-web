// @flow
import {error, compose, status, header, send, App} from 'midori';
import {readFileSync} from 'fs';
import path from 'path';
import {renderError} from '/render';

/**
 * Try to handle errors using the app's error root.
 * @returns {App} Midori app.
 */
export const handleAppError = (): App => error(async (error, req) => {
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
  if (__DEV__) {
    return '<!DOCTYPE html><html><body>Unhandled error!</body></html>';
  }
  return readFileSync(
    path.join('dist', 'client', 'error', '500', 'index.html'),
    'utf8',
  );
};

/**
 * If everything fails then return an HTTP 500 with a static pre-rendered
 * error page.
 * @returns {App} Midori app.
 */
export const handleEmergencyError = (): App => {
  const markup = getEmergencyErrorMarkup();
  return error(() => {
    return compose(
      status(500),
      header('Content-Type', 'text/html; charset=utf-8'),
      send(markup),
    );
  });
};

export default (): App => compose(
  handleAppError(),
  handleEmergencyError(),
);
