// @flow
import ExtendableError from 'es6-error';
import {compose, request, error, send} from 'midori';
import {fetch} from 'midori/test';
import createErrorHandler from '/server/createErrorHandler';

jest.mock('/render', () => {
  return {
    renderError: ({path, error}) => {
      if (path === '/error') {
        return {markup: 'hello', status: error.statusCode};
      } else if (path === '/emergency') {
        throw new Error('Throwing emergency error.');
      }
      throw new TypeError('Invalid path to mock `renderError` function.');
    },
  };
});

jest.mock('fs', () => {
  return {
    readFileSync: (name) => {
      // TODO: Make this better.
      if (/error\/.*/.exec(name)) {
        return 'bananas';
      }
      throw new TypeError('Invalid path to mock `fs.readFileSync` function.');
    },
  };
});

class Boom extends ExtendableError {
  statusCode = 500;
  constructor(code) {
    super();
    this.statusCode = code;
  }
}

const boom = (code) => {
  return request(() => {
    throw new Boom(code);
  });
};

describe('/server/createRenderErrorMiddleware', () => {
  it('should render error', () => {
    const app = compose(boom(420), createErrorHandler());
    return fetch(app, '/error').then((res) => {
      expect(res.statusCode).toBe(420);
      expect(res.body).toContain('hello');
    });
  });
  it('should handle errors in the error handler', () => {
    const app = compose(boom(420), createErrorHandler());
    return fetch(app, '/emergency').then((res) => {
      expect(res.statusCode).toBe(500);
      expect(res.body).toContain('bananas');
    });
  });
  describe('development mode', () => {
    beforeEach(() => {
      global.__DEV__ = true;
    });
    afterEach(() => {
      global.__DEV__ = false;
    });
    it('should bubble up errors', () => {
      const app = compose(
        boom(420),
        createErrorHandler(),
        error(() => {
          return send('bananas');
        }),
      );
      return fetch(app, '/emergency').then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toContain('bananas');
      });
    });
  });
});
