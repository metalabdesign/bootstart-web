// @flow

// Import modules ==============================================================
// flowlint untyped-import: off
import {compose, request, error, send, header, status, next} from 'midori';
// flowlint untyped-import: error
import type {Hub} from 'webpack-udev-server';

import {renderApp} from '/render';
import assets from './assets';

export default (hub?: Hub) => {
  return compose(
    assets(hub),
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
      console.error(error);
      throw error;
    }),
  );
};
