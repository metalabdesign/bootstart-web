// @flow

/* flowlint
 *   untyped-import: off
 */

// Import modules ==============================================================
import {compose, request, send, header, status, next} from 'midori';
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
    const {markup, redirect} = await renderApp({
      stats: req.stats,
      path: req.url,
    });
    return compose(
      status(redirect ? 302 : 200),
      header('Content-Type', 'text/html; charset=utf-8'),
      redirect ? header('Location', redirect) : next,
      send(markup),
    );
  }),
);
