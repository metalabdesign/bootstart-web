/* @flow */
import React from 'react';
import {Provider} from 'react-redux';
import {Switch, Match} from 'waygate';
import {compose} from 'ramda';
import {hot} from 'react-hot-loader';

const App = ({store}) => (
  <Provider store={store}>
    <Switch>
      <Match path='/foo'>
        Hello world .
      </Match>
      <Match path='/'>
        Not found Y.
      </Match>
    </Switch>
  </Provider>
);

export default compose(
  hot(module),
)(App);
