import renderApp from './renderApp';
import parseInitialState from './parseInitialState';
import createStore from '/store';

// TODO: This doesn't get included in the bundle for some reason so we have
// to shove it here.
import 'extract-css-chunks-webpack-plugin/hotModuleReplacement';
import './global.css';

const state = parseInitialState();

const store = createStore(state);

// setExceptionHandler(renderError)
// setExceptionHandler(renderApp)
renderApp(store);
