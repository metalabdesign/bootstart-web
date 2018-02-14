// @flow

// Import modules ==============================================================
import React from 'react';
import {Provider} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {compose} from 'ramda';
import {hot} from 'react-hot-loader';

// Import components ===========================================================
import Status from '/component/util/Status';

const AppRoot = ({store}) => {
  return (
    <Provider store={store}>
      <Switch>
        <Route
          path='/foo'
          component={() => (
            <button onClick={() => {throw new Error('Sample Error');}}>
              Throw sample error
            </button>
          )}
        />
        <Route
          component={() => (
            <div>
              <Status code={404}/>
              not found
            </div>
          )}
        />
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
