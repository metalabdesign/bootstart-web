import Modernizr from 'modernizr';

export const test = (cb) => {
  // Force the client build to use the `whatwg-fetch` polyfill even if a native
  // `fetch` implementation is available. This is useful for debugging network
  // issues during development.
  if (process.env.FORCE_FETCH_POLYFILL) {
    cb(false);
    return;
  }
  Modernizr.on('fetch', cb);
};
export const load = (cb) => require.ensure(['whatwg-fetch'], (require) => {
  global.fetch = require('whatwg-fetch');
  cb();
}, 'fetch.polyfill');
export const name = 'fetch';

export default {test, load, name};
