import {join} from 'path';
import {compose} from 'ramda';
import {loader, plugin} from 'webpack-partial';
import ExtractTextPlugin from 'extract-css-chunks-webpack-plugin';

const PRODUCTION = process.env.NODE_ENV === 'production';
const IS_STYLE = /\.(css(\.js)?)$/;

// TODO: `extract-css-chunks-webpack-plugin` isn't perfect either. There is a
// hardcoded reference to `process.env.NODE_ENV === 'development'` in the code
// instead of a config option. Escape hatch here for now.
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

export default () => {
  // TODO: `extract-css-chunks-webpack-plugin` isn't perfect either. There
  // are some notable things: the HMR they use is based entirely on the CSS
  // filename being the same in development mode. So this has to match.
  const extractor = new ExtractTextPlugin({
    filename: PRODUCTION ? '[name].[hash].css' : '[name].css',
  });

  const options = {
    modules: true,
    localIdentName: PRODUCTION
      ? '[hash:base64]'
      : '[name]--[local]--[hash:base64:5]',
    minimize: PRODUCTION,
    importLoaders: 1,
  };

  return (config) =>
    compose(
      plugin(extractor),
      loader({
        test: /\.css\.js$/,
        loader: [
          require.resolve('css-js-loader'),
          require.resolve('value-loader'),
        ],
      }),
      loader({
        test: IS_STYLE,
        loader: require.resolve('postcss-loader'),
        options: {
          config: {
            path: join(config.context, 'config', 'postcss'),
          },
        },
      }),
      config.target === 'web'
        ? loader({
            test: IS_STYLE,
            loader: extractor.extract({
              use: {
                loader: require.resolve('css-loader'),
                options,
              },
            }),
          })
        : loader({
            test: IS_STYLE,
            loader: require.resolve('css-loader/locals'),
            options,
          }),
    )(config);
};
