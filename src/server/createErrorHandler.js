// @flow

/* flowlint
 *   untyped-import:off
 */

import {error, compose, status, header, send} from 'midori';
import {readFileSync} from 'fs';
import {renderError} from '/render';

import type {AppCreator} from 'midori/types';

/**
 * Try to handle errors using the app's error root.
 * @returns {AppCreator} Midori app.
 */
const handleAppError = (): AppCreator => error(async (error, req) => {
  const {markup, status} = await renderError({
    stats: req.stats,
    path: req.url,
    error,
  });
  return compose(
    status(status),
    header('Content-Type', 'text/html; charset=utf-8'),
    send(markup),
  );
});

/**
 * If everything fails then return an HTTP 500 with a static pre-rendered
 * error page.
 * @returns {AppCreator} Midori app.
 */
const handleEmergencyError = (): AppCreator => {
  const markup = readFileSync('error.html', 'utf8');
  return error(() => {
    return compose(
      status(500),
      header('Content-Type', 'text/html; charset=utf-8'),
      send(markup),
    );
  });
};

export default (): AppCreator => compose(
  handleAppError(),
  handleEmergencyError(),
);
