import {join} from 'path';
import {compose} from 'ramda';
import {loader, plugin} from 'webpack-partial';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';

const PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * CSS Webpack loader partial.
 *
 * @param {Boolean|Object} options.extract Enable/disable Extract Text Plugin.
 * An object value is used as options for the Extract Text Plugin constructor.
 * @param {Boolean} options.minimize Enable/disable cssnano minification.
 * @param {Boolean} options.jsStyles Enable/disable `css-js-loader`.
 * @param {Boolean|Object} options.postcss Enable/disable `postcss-loader`.
 * An object value is used as options for `postcss-loader`.
 * @param {Boolean} options.modules Enable/disable CSS Modules.
 * @param {String} options.localIdentName CSS Modules local identifier template.
 * @returns {Function} Webpack config partial.
 */
export default ({
  // extract = PRODUCTION,
  minimize = PRODUCTION,
  postcss = true,
  modules = true,
  localIdentName = PRODUCTION
    ? '[hash:base64]'
    : '[name]--[local]--[hash:base64:5]',
  ...options
} = {}) => {
  const IS_STYLE = /\.(css(\.js)?)$/;
  const IS_JS_STYLE = /\.css\.js$/;

  const extractor = null; /* new ExtractTextPlugin({
    disable: !extract,
    filename: '[name].[hash].css',
    ...extract,
  });*/

  const importLoaders = postcss ? 1 : 0;

  const query = {modules, localIdentName, minimize, importLoaders, ...options};

  return (config) => compose(
    plugin(extractor),
    loader({
      test: IS_JS_STYLE,
      loader: require.resolve('value-loader'),
    }),
    loader({
      test: IS_JS_STYLE,
      loader: require.resolve('css-js-loader'),
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
            query,
          },
          fallback: require.resolve('style-loader'),
        }),
      })
      : loader({
        test: IS_STYLE,
        loader: require.resolve('css-loader/locals'),
        query,
      }),
  )(config);
};
