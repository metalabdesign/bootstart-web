import {compose} from 'ramda';

import base from './partial/base';
import node from './partial/node';

const createConfig = compose(
  node(),
  base({name: 'server', target: 'node'}),
);

export default createConfig({});
