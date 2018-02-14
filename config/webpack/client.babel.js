import {compose} from 'ramda';
import {output} from 'webpack-partial';

import base from './partial/base';

const createConfig = compose(
  output({
    publicPath: '/asset',
  }),
  base({name: 'client', target: 'web'}),
);

export default createConfig({});
