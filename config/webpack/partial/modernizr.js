import {alias, loader} from 'webpack-partial';
import {compose} from 'ramda';
import path from 'path';

export default (rc = '.modernizrrc.js') => compose(
  loader({
    test: /\.modernizrrc/,
    loader: require.resolve('modernizr-loader'),
  }),
  (config) => alias(
    'modernizr$',
    rc.charAt(0) === '/' ? rc : path.join(config.context, rc),
    config
  )
);
