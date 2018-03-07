// @flow

// TODO: This doesn't get included in the bundle for some reason so we have
// to shove it here.
import 'extract-css-chunks-webpack-plugin/hotModuleReplacement';

import './exceptionHandler';

import createHistory from 'history/createBrowserHistory';

import createStore from '/store';
import reducer from '/reducer';

import parseInitialState from './parseInitialState';
import renderApp from './renderApp';

const state = parseInitialState();
const history = createHistory();

const context = {
  history,
};

const store = createStore({
  history,
  context,
  reducer,
  state,
});

if (module.hot) {
  module.hot.accept('../reducer', () => {
    // eslint-disable-next-line no-console
    console.log('🚒  Hot reload reducers');
    const nextReducer = require('../reducer').default;
    store.replaceReducer(nextReducer);
  });
}
renderApp({store, history});
