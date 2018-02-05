// @flow

// TODO: This doesn't get included in the bundle for some reason so we have
// to shove it here.
import 'extract-css-chunks-webpack-plugin/hotModuleReplacement';
import './global.css';

import createStore from '/store';
import parseInitialState from './parseInitialState';
import renderApp from './renderApp';

Promise.resolve(Object.freeze({}))
  .then(parseInitialState)
  .then(createStore)
  .then(renderApp);
