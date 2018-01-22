import {getSupport, detectBrowser} from 'caniuse-support';
import {request, next} from 'midori';

export default request((req) => {
  if (!req.__browser) {
    req.__browser = detectBrowser(req.headers['user-agent']);
  }
  const browser = req.__browser;
  const detect = (feature) => {
    return getSupport(feature, browser).level === 'full';
  };
  req.preload = [];
  if (!detect('fetch')) {
    req.preload.push('fetch.polyfill');
  }
  if (!detect('promises')) {
    req.preload.push('promise.polyfill');
  }
  if (!detect('history')) {
    req.preload.push('history.polyfill');
  }
  return next;
});
