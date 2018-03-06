// @flow

// Import modules ==============================================================
import React from 'react';
import {Provider} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {compose} from 'ramda';
import {hot} from 'react-hot-loader';

// Import components ===========================================================
import LandingView from '/component/view/LandingView';
import NotFoundView from '/component/view/NotFoundView';

import '/client/globalStyles';

const AppRoot = ({store}) => {
  return (
    <Provider store={store}>
      <Switch>
        <Route path='/' component={LandingView}/>
        <Route component={NotFoundView}/>
      </Switch>
    </Provider>
  );
};

AppRoot.rootElementId = 'app';

export default compose(
  hot(module),
)(AppRoot);

if (module.hot) {
  if (module.hot.status() === 'apply') {
    // eslint-disable-next-line no-console
    console.log('🚒  Hot reload AppRoot');
  }
}
