import {compose, assoc, identity, map} from 'ramda';
import nearest from 'find-nearest-file';
import path from 'path';
import webpack from 'webpack';
import fs from 'fs';

import {output, loader, plugin} from 'webpack-partial';

// import env from 'webpack-config-env';
// import css from './css';
// import icon from './icon';
// import image from './image';

import CleanPlugin from 'clean-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';

const context = path.dirname(nearest('package.json'));
const babelConfig = JSON.parse(fs.readFileSync(path.join(context, '.babelrc')));

const isProduction = process.env.NODE_ENV === 'production';
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const getTargets = (target) => {
  switch (target) {
  case 'node':
    return {node: 'current'};
  case 'web':
  default:
    return undefined;
  }
};

const base = ({name, target}) => compose(
  (config) => plugin(new CleanPlugin([config.output.path], {
    root: config.context,
  }), config),

  assoc(
    'mode',
    process.env.NODE_ENV === 'production' ? 'production' : 'development'
  ),

  plugin(new StatsPlugin('stats.json')),
  plugin(new webpack.HashedModuleIdsPlugin()),
  isDev ? plugin(new CaseSensitivePathsPlugin()) : identity,

  /* env({
    NODE_ENV: {required: false},
  }),*/

  (config) => loader({
    loader: 'babel-loader',
    include: [
      path.join(config.context, 'src'),
      path.join(config.context, 'lib'),
    ],
    test: /\.js$/,
    options: {
      ...babelConfig,
      presets: map((entry) => {
        const [name, config] = Array.isArray(entry) ?
          entry : [entry, {}];
        if (name === '@babel/preset-env') {
          return [name, {
            ...config,
            modules: false,
            useBuiltIns: 'usage',
            ignoreBrowserslistConfig: target === 'node',
            targets: getTargets(target),
            include: [
              ...(config.include || []),
              // While newer versions of node support this, `webpack` does
              // not because it uses `acorn`. So adjust accordingly.s
              'proposal-object-rest-spread',
            ],
          }];
        }
        return entry;
      }, babelConfig.presets),
      cacheDirectory: false,
    },
  }, config),

  // icon(),
  // image(),
  /* css({
    extract: !isDev,
    localIdentName: '[local]_[hash:base64:8]',
    getLocalIdent: isDev
      ? (loaderContext, localIdentName, localName) => {
        const basename = path.basename(loaderContext.resourcePath)
          .replace(/\.css(\.js)$/, '');

        let dirname = path.relative(
          path.join(context, 'src', 'component'),
          path.dirname(loaderContext.resourcePath),
        );

        if (!dirname.endsWith(`${path.sep}${basename}`)) {
          dirname = path.join(dirname, basename);
        }

        return `${dirname.replace(/\.|\//g, '-')}_${localName}`;
      }
      : undefined,
  }),*/

  // ========================================================================
  // Optimization
  // ========================================================================
  !isProduction ? identity : compose(
    plugin(new webpack.optimize.ModuleConcatenationPlugin()),
  ),

  // ========================================================================
  // Output Settings
  // ========================================================================
  // Define chunk file name pattern. Use the content hash as the filename in
  // production web targeted builds to prevent browser caching between releases.
  output({
    path: path.join(context, 'dist', name),
    ...isProduction && target === 'web' ? {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[id].[name].[chunkhash].js',
    } : {
      filename: '[name].js',
      chunkFilename: '[id].[name].js',
    },
  }),

  // Define the build root context as the nearest directory containing a
  // `package.json` file. This is be the absolute path to the project root.
  assoc('context', context),
  assoc('target', target),
  // Define an entry chunk. A `name` property must be defined on the initial
  // config object.
  assoc('entry', {
    index: path.join(context, 'src', `${name}`),
  }),

);

export default base;
