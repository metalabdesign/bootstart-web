import {compose} from 'ramda';
import {output, plugin} from 'webpack-partial';
import PagesPlugin from 'pages-webpack-plugin';

import base from './partial/base';
import modernizr from './partial/modernizr';

const getRender = () => {
  try {
    return require('../../dist/render').default;
  } catch (err) {
    console.log('Unable to load static page renderer.');
    console.log('Make sure you built the renderer first.');
    return () => {};
  }
};

const createConfig = compose(
  (config) => {
    if (process.env.NODE_ENV !== 'production') {
      return config;
    }
    return plugin(new PagesPlugin({
      name: 'html/[path][name].[ext]',
      paths: [
        '/',
        '/error/404',
        '/error/500',
      ],
      mapStatsToProps: (stats) => {
        return {stats};
      },
      render: getRender(),
    }), config);
  },
  modernizr(),
  output({
    publicPath: '/asset',
  }),
  base({name: 'client', target: 'web'}),
);

export default createConfig({});
