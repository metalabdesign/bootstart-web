/* @flow */
import fetch from './fetch';
import promise from './promise';
import history from './history';

type Callback = () => void;
type Polyfill = {
  test: (callback: (result: boolean) => void) => void,
  load: (callback: () => void) => void,
  name: string,
};

const load = ([item, ...rest]: Array<Polyfill>, done: Callback) => {
  const next = () => {
    if (rest.length > 0) {
      load(rest, done);
    } else {
      done();
    }
  };
  item.test((result) => {
    if (!result) {
      item.load(next);
    } else {
      next();
    }
  });
};

const polyfills = [
  fetch,
  promise,
  history,
];

export default (done: Callback) => load(polyfills, done);
