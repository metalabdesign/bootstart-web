import {loader} from 'webpack-partial';
import path from 'path';

export default () => (config) => {
  const IMAGE_REGEXP = /\.(jpg|png)/;
  if (config.target === 'web') {
    return loader({
      test: IMAGE_REGEXP,
      loader: require.resolve('sharp-loader'),
      query: {
        presets: {
          generic: {
            name: '[name]@[density]x.[hash:8].[ext]',
            format: (meta) => {
              if (meta.hasAlpha) {
                return ['webp', 'png'];
              }
              return ['webp', 'jpeg'];
            },
            density: [1, 2, 3],
          },
          prefetch: {
            name: '[name]-prefetch.[hash:8].[ext]',
            format: (meta) => {
              if (meta.hasAlpha) {
                return 'png';
              }
              return 'jpeg';
            },
            blur: 100,
            quality: 30,
            inline: true,
            size: 50,
          },
        },
      },
    }, config);
  }
  return loader({
    test: IMAGE_REGEXP,
    loader: require.resolve('cross-loader'),
    options: {
      stats: path.join(config.context, 'dist', 'client', 'stats.json'),
    },
  }, config);
};
