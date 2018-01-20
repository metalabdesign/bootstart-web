import {fetch} from 'midori/test';
import app from '/server/app';
import {expect} from 'chai';

describe('/server/app', () => {
  it('should render the page', () => {
    return fetch(app, '/').then((res) => {
      expect(res.body).to.contain('<!DOCTYPE html>');
    });
  });
  it.skip('should handle redirects', () => {
    return fetch(app, '/redirect').then((res) => {
      expect(res.statusCode).to.equal(302);
    });
  });
});
