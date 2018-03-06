// @flow
import {request, compose, next} from 'midori';
import {fetch} from 'midori/test';
import createPageMiddleware from '/server/createPageMiddleware';

jest.mock('/render', () => {
  return {
    renderApp: ({path}) => {
      if (path === '/success') {
        return {markup: 'hello', status: 200};
      } else if (path === '/redirect') {
        return {redirect: '/bananas', markup: '', status: 302};
      }
      throw new TypeError('Invalid path to mock `renderApp` function');
    },
  };
});

const fakeStats = request((req) => {
  req.stats = {};
  return next;
});

describe('/server/createPageMiddleware', () => {
  it('should render the page', () => {
    const app = compose(
      fakeStats,
      createPageMiddleware(),
    );
    return fetch(app, '/success').then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body).toContain('hello');
    });
  });
  it('should handle redirects', () => {
    const app = compose(
      fakeStats,
      createPageMiddleware(),
    );
    return fetch(app, '/redirect').then((res) => {
      expect(res.statusCode).toBe(302);
    });
  });
});
