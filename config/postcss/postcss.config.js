/* eslint-disable metalab/import/no-commonjs */
const pkg = require('../../package.json');

module.exports = {
  plugins: [
    require('postcss-nesting'),
    require('autoprefixer')({browsers: pkg.browserlist}),
  ],
};
