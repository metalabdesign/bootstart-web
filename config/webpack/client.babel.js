import {compose, identity} from 'ramda';
import {join} from 'path';
import {output, plugin} from 'webpack-partial';
import PagesPlugin from 'pages-webpack-plugin';

import base from './partial/base';
import promise from './partial/promise';

const createConfig = compose(
  output({
    publicPath: '/asset',
  }),
  __DEV__ ? identity : (config) => plugin(new PagesPlugin({
    name: '[path][name].[ext]',
    paths: [
      '/',
      '/error/404',
      '/error/500',
    ],
    mapStatsToProps: (stats) => {
      return {stats};
    },
    render: require(join(config.context, 'dist', 'render')).default,
  }), config),
  promise(),
  base({name: 'client', target: 'web'}),
);

export default createConfig({});
