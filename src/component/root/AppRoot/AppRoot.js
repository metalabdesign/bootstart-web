// @flow

// Import modules ==============================================================
import React from 'react';
import {Provider} from 'react-redux';
import {compose} from 'ramda';
import {hot} from 'react-hot-loader';

const AppRoot = ({store}) => {
  return (
    <Provider store={store}>
      <div>app root</div>
    </Provider>
  );
};

AppRoot.rootNodeId = 'app';

export default compose(
  hot(module),
)(AppRoot);

if (module.hot) {
  if (module.hot.status() === 'apply') {
    // eslint-disable-next-line no-console
    console.log('🚒  Hot reload AppRoot');
  }
}
