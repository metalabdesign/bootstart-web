// @flow

// Import modules ==============================================================
// flowlint untyped-import: off
import {request, next, serve, match} from 'midori';
import {path} from 'midori/match';
// flowlint untyped-import: error
import fs from 'fs';
import {join} from 'path';
import {compose, identity} from 'ramda';
import createFileWatcher from 'webpack-udev-server/createFileWatcher';
import type {Hub} from 'webpack-udev-server';

const CLIENT_DIST = './dist/client';
const STATS_PATH = join(CLIENT_DIST, 'stats.json');

const isAbsolutePath = (path: string) => /^\//.test(path);

const devAssets = (hub?: Hub) => {
  const watcher = createFileWatcher(STATS_PATH, {hub});
  return request((req) => {
    return watcher.poll({hub}).then((data) => {
      req.stats = JSON.parse(data.toString('utf8'));
      return next;
    });
  });
};

const staticAssets = () => {
  const stats = JSON.parse(fs.readFileSync(STATS_PATH, 'utf8'));
  return compose(
    request((req) => {
      req.stats = stats;
      return next;
    }),
    isAbsolutePath(stats.publicPath)
      ? match(path(stats.publicPath), serve({root: CLIENT_DIST}))
      : identity,
  );
};

const assets = (hub?: Hub) => {
  // eslint-disable-next-line camelcase
  return hub || global.__webpack_udev_hub__ ? devAssets(hub) : staticAssets();
};

export default assets;
