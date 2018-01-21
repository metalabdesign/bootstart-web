/* @flow */
import React from 'react';
import {Provider} from 'react-redux';
import {Switch, Match} from 'waygate';
import {compose} from 'ramda';
import {hot} from 'react-hot-loader';

import IntlProvider from '/component/provider/IntlProvider';

import {FormattedMessage} from 'react-intl';

const App = ({store}) => (
  <Provider store={store}>
    <IntlProvider>
      <Switch>
        <Match path='/foo'>
          <FormattedMessage
            id='some message'
            defaultMessage='Hello World'
          />
        </Match>
        <Match path='/'>
          Not found Y.
        </Match>
      </Switch>
    </IntlProvider>
  </Provider>
);

export default compose(
  hot(module),
)(App);
