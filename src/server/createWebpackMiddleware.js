// @flow

// Import modules ==============================================================
import {compose, request, serve, assign, use, next, App} from 'midori';
import fs from 'fs';
import {join} from 'path';
import {createClient, Client} from 'webpack-udev-server';

import type {WebpackStats} from '/render/types';

type MapStats = (x: WebpackStats) => App;

/**
 * Get the webpack stats information from the dev server. This requires a
 * connection to the dev server which is passed through.
 * @param {Object} devServer Thing.
 * @returns {Function} Next.
 */
export const getDevStats = (devServer: Client = createClient()) => (
  fn: MapStats,
) => {
  return request(() => {
    return devServer.getStats('client').then(fn);
  });
};

/**
 * Get the client webpack stats information from the static build results. This
 * is used in production builds.
 * @param {Function} fn Wee.
 * @returns {App} The result of `fn` applied to the stats object.
 */
export const getStaticStats = (fn: MapStats) => {
  const stats = JSON.parse(
    fs.readFileSync(join('dist', 'client', 'stats.json'), 'utf8'),
  );
  return fn(stats);
};

/**
 * Serve the client webpack bundle and assets through the server. This is used
 * when not hosting assets via a third party like S3. This is _NOT_ used during
 * dev mode as the dev server itself handles serving the assets.
 * @param {Object} options A subset of the webpack `config.output` object.
 * @param {String} options.publicPath Path from which the assets are served.
 * @param {String} options.path Path on disk where the assets are located.
 * @returns {App} App thing.
 */
type ServeStaticOptions = {
  publicPath: string,
  path: string,
};
export const serveStaticAssets = ({publicPath, path}: ServeStaticOptions) => {
  return use(
    publicPath,
    serve({
      root: path,
    }),
  );
};

/**
 * Connect webpack to the app.
 * @param {Object} options Options to control the middleware.
 * @param {Function} options.getStats Function to fetch the stats object.
 * @param {Boolean} options.serve True to serve webpack assets statically.
 * @returns {App} App thing.
 */
export type Options = {
  getStats: (fn: MapStats) => App,
  serve: boolean,
};
const createWebpackMiddleware = ({
  getStats = __DEV__ ? getDevStats() : getStaticStats,
  serve = !__DEV__,
}: Options = {}) => {
  return compose(
    getStats((stats) => assign({stats})),
    serve
      ? serveStaticAssets({
          publicPath: '/asset',
          path: join('dist', 'client'),
        })
      : next,
  );
};

export default createWebpackMiddleware;
