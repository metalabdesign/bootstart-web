import {compose} from 'ramda';
import {output} from 'webpack-partial';

import base from './partial/base';
import promise from './partial/promise';

const createConfig = compose(
  output({
    publicPath: '/asset',
  }),
  promise(),
  base({name: 'client', target: 'web'}),
);

export default createConfig({});
