/* @flow */
import React from 'react';
import {Provider} from 'react-redux';
import {Switch, Match} from 'waygate';
import {compose} from 'ramda';
import {hot} from 'react-hot-loader';

import Button from '/component/base/Button';

const App = ({store}) => (
  <Provider store={store}>
    <Switch>
      <Match path='/foo'>
        Hello world .
      </Match>
      <Match path='/'>
        Not found Y.
        <Button>Click</Button>
      </Match>
    </Switch>
  </Provider>
);

export default compose(
  hot(module),
)(App);
