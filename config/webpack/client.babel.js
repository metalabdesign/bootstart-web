import {compose} from 'ramda';
import {output, plugin} from 'webpack-partial';
import PagesPlugin from 'pages-webpack-plugin';

import base from './partial/base';

const getRender = () => {
  try {
    return require('../../dist/render');
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
        '/error/500',
      ],
      mapStatsToProps: (stats) => {
        return {stats};
      },
      render: (props) => {
        const render = getRender();
        if (props.path === '/error/500') {
          return render.renderError({
            ...props,
            error: new Error(),
          });
        }
        return render.renderApp(props);
      },
    }), config);
  },
  output({
    publicPath: '/asset',
  }),
  base({name: 'client', target: 'web'}),
);

export default createConfig({});
