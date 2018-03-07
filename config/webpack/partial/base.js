import {compose, assoc, identity} from 'ramda';
import nearest from 'find-nearest-file';
import path from 'path';
import webpack from 'webpack';

import {output, plugin} from 'webpack-partial';

// import css from './css';
// import icon from './icon';
// import image from './image';
import babel from './babel';

import CleanPlugin from 'clean-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';

const context = path.dirname(nearest('package.json'));

const base = ({name, target}) => {
  return compose(
    (config) =>
      plugin(
        new CleanPlugin([config.output.path], {
          root: config.context,
        }),
        config,
      ),

    plugin(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ),

    assoc('mode', __DEV__ ? 'development' : 'production'),

    assoc('devtool', __DEV__ || target === 'node' ? 'source-map' : 'false'),

    plugin(new StatsPlugin('stats.json')),
    plugin(new webpack.HashedModuleIdsPlugin()),
    __DEV__ ? plugin(new CaseSensitivePathsPlugin()) : identity,

    babel(),

    // icon(),
    // image(),

    // ========================================================================
    // Optimization
    // ========================================================================
    __DEV__
      ? identity
      : compose(plugin(new webpack.optimize.ModuleConcatenationPlugin())),

    // ========================================================================
    // Output Settings
    // ========================================================================
    // Define chunk file name pattern. Use the content hash as the filename in
    // production builds to prevent browser caching between releases.
    output({
      path: path.join(context, 'dist', name),
      ...(!__DEV__ && target === 'web'
        ? {
            filename: '[name].[hash].js',
            chunkFilename: '[name].[hash].js',
          }
        : {
            filename: '[name].js',
            chunkFilename: '[name].js',
          }),
    }),

    // Define the build root context as the nearest directory containing a
    // `package.json` file. This is be the absolute path to the project root.
    assoc('context', context),
    assoc('target', target),
    assoc('name', name),

    // Define an entry chunk. A `name` property must be defined on the initial
    // config object.
    assoc('entry', {
      index: [
        ...(__DEV__ || target === 'node'
          ? [require.resolve('source-map-support/register')]
          : []),
        path.join(context, 'src', `${name}`),
      ],
    }),
  );
};

export default base;
