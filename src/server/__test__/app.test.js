// @flow

// flowlint untyped-import: off
import {fetch} from 'midori/test';
// flowlint untyped-import: error
import app from '/server/app';

const statData = Buffer.from(JSON.stringify({
  assets: [],
  chunks: [],
  hash: '',
  publicPath: '',
})).toString('base64');

const mockHub = {
  dispatch() {},
  demand(action, callback) {
    callback({type: '', payload: {data: statData}});
    return () => {};
  },
  provide() {
    return () => {};
  },
  subscribe() {
    return () => {};
  },
  url: '',
};

describe('/server/app', () => {
  it('should render the page', () => {
    return fetch(app(mockHub), '/').then((res) => {
      expect(res.body).toContain('<!DOCTYPE html>');
    });
  });
  it.skip('should handle redirects', () => {
    return fetch(app(mockHub), '/redirect').then((res) => {
      expect(res.statusCode).toBe(302);
    });
  });
});
