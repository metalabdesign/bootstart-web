import nodeExternals from 'webpack-node-externals';
import {compose} from 'ramda';

import base from './partial/base';

const createConfig = compose(
  base({name: 'server', target: 'node'}),
);

export default createConfig({
  externals: [nodeExternals()],
});
