// @flow
import {compose, request, send, header, status, next, App} from 'midori';
import {renderApp} from '/render';

const createPageMiddleware = (): App =>
  request(async (req) => {
    if (typeof req.stats !== 'object') {
      throw new TypeError('Missing `stats`.');
    }
    const result = await renderApp({
      path: req.url,
      stats: req.stats,
    });
    return compose(
      status(result.status),
      header('Content-Type', 'text/html; charset=utf-8'),
      result.redirect ? header('Location', result.redirect) : next,
      send(result.markup),
    );
  });

export default createPageMiddleware;
