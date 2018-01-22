import nodeExternals from 'webpack-node-externals';
import {compose, assoc} from 'ramda';

export default compose(
  assoc('externals', [nodeExternals()]),
);
