import {map, pipe, toPairs, fromPairs} from 'ramda';
import chalk from 'chalk';
import {DefinePlugin} from 'webpack';
import {plugin} from 'webpack-partial';

const extract = pipe(
  toPairs,
  map(([key, {value, required}]) => {
    if (key in process.env) {
      const val = process.env[key];
      console.log(`   ${chalk.yellow(key)} ${chalk.bold(val)}`);
      return [`process.env.${key}`, JSON.stringify(val)];
    }

    if (typeof value !== 'undefined') {
      const val = value;
      console.log(`   ${chalk.yellow(key)} ${chalk.bold(val)}`);
      return [`process.env.${key}`, JSON.stringify(val)];
    }

    if (required) {
      throw new TypeError(`Required env variable ${key} is not defined`);
    }

    return [`process.env.${key}`, undefined];
  }),
  fromPairs,
);

const env = (env = {}) => console.log(chalk.bold('📦  Enironment')) ||
  plugin(new DefinePlugin(extract(env)));

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export default () => env({
  NODE_ENV: {
    value: 'development',
    required: true,
  },
  FORCE_PROMISE_POLYFILL: {
    value: isDev ? 'true' : '',
    required: false,
  },
  FORCE_FETCH_POLYFILL: {
    value: isDev ? 'true' : '',
    required: false,
  },
});
