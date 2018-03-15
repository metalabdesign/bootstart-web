import {request, compose, halt} from 'midori';
import {fetch} from 'midori/test';
import createWebpackMiddleware from '/server/createWebpackMiddleware';

describe('/server/createWebpackMiddleware', () => {
  it('should attach stats to the request', () => {
    const app = compose(
      createWebpackMiddleware({
        serve: false,
        getStats: (fn) => {
          return fn({
            assets: [],
            chunks: [],
            hash: '',
            publicPath: '/foo',
          });
        },
      }),
      request((req, res) => {
        res.stats = req.stats;
        return halt;
      }),
    );
    return fetch(app).then((res) => {
      expect(res.stats.publicPath).toBe('/foo');
    });
  });
});
