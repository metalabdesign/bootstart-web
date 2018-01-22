import {compose} from 'ramda';

import {output} from 'webpack-partial';

import base from './partial/base';
import node from './partial/node';

const createConfig = compose(
  output({
    library: 'render',
    libraryTarget: 'commonjs2',
  }),
  node(),
  base({name: 'render', target: 'node'}),
);

export default createConfig({});
