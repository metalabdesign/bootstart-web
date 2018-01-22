import Modernizr from 'modernizr';

export const test = (cb) => {
  // Force the client build to use `bluebird` for all promises even if a
  // native implementation is available. This is useful for debugging promise
  // issues during development.
  if (process.env.FORCE_PROMISE_POLYFILL) {
    cb(false);
    return;
  }
  Modernizr.on('promises', cb);
};
export const load = (cb) => require.ensure([
  'bluebird/js/browser/bluebird.core',
], (require) => {
  global.Promise = require('bluebird/js/browser/bluebird.core');
  cb();
}, 'promise.polyfill');
export const name = 'promise';

export default {test, load, name};
