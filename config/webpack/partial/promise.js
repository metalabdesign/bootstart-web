import webpack from 'webpack';
import {plugin, alias} from 'webpack-partial';
import compose from 'ramda/src/compose';

const bluebirdCore = require.resolve('bluebird/js/browser/bluebird.core');

const promise = () => compose(
  alias('@babel/runtime/core-js/promise', bluebirdCore),
  plugin(new webpack.ProvidePlugin({
    Promise: bluebirdCore,
  })),
);

export default promise;
