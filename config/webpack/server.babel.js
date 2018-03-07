import nodeExternals from 'webpack-node-externals';
import {compose, identity} from 'ramda';
import {alias} from 'webpack-partial';

import base from './partial/base';

const createConfig = compose(
  __DEV__
    ? identity
    : alias(
        'webpack-udev-server',
        require.resolve('./stub/webpack-udev-server'),
      ),
  base({name: 'server', target: 'node'}),
);

export default createConfig({
  externals: [
    nodeExternals({
      whitelist: __DEV__ ? [] : ['webpack-udev-server'],
    }),
  ],
});
