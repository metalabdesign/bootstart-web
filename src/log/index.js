/* @flow */
/* eslint-disable no-console */

const createLog = (level: string) => (...msgs: Array<*>) => {
  console[level](...msgs);
};

export const debug = createLog('debug');
export const info = createLog('info');
export const warn = createLog('warn');
export const error = createLog('error');
