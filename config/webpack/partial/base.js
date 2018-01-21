import {compose, assoc, identity} from 'ramda';
import nearest from 'find-nearest-file';
import path from 'path';
import webpack from 'webpack';

import {output, plugin} from 'webpack-partial';

import env from './env';
import css from './css';
// import icon from './icon';
// import image from './image';
import babel from './babel';

import CleanPlugin from 'clean-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';

const context = path.dirname(nearest('package.json'));

const isProduction = process.env.NODE_ENV === 'production';
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

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

  env(),
  babel(),
  css(),

  // icon(),
  // image(),

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
      chunkFilename: '[name].[chunkhash].js',
    } : {
      filename: '[name].js',
      chunkFilename: '[name].js',
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
