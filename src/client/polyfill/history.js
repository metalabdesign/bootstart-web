import Modernizr from 'modernizr';

export const test = (cb) => Modernizr.on('history', cb);
export const load = (cb) => require.ensure([
  'html5-history-api/history',
], (require) => {
  require('html5-history-api/history');
  cb();
}, 'history.polyfill');
export const name = 'history';

export default {test, load, name};
