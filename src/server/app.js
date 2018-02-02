// @flow

/* flowlint
 *   untyped-import: off
 */

// Import modules ==============================================================
import {compose, request, error, send, header, status, next} from 'midori';
// import {withStats} from 'midori-webpack';

import {renderApp} from '/render';

// import createFileWatcher from 'webpack-udev-server/createFileWatcher';
// const watcher = createFileWatcher('./dist/client/stats.json');

export default compose(
  // request((req) => {
  //   return watcher.poll().then((data) => {
  //     req.stats = JSON.parse(data.toString('utf8'));
  //     return next;
  //   });
  // }),
  request(async (req) => {
    const result = await renderApp({path: req.url, stats: req.stats});
    return compose(
      status(result.status),
      header('Content-Type', 'text/html; charset=utf-8'),
      result.redirect ? header('Location', result.redirect) : next,
      send(result.markup),
    );
  }),
  error(async (error) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    throw error;
  }),
);
