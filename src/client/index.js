import renderApp from './renderApp';
import parseInitialState from './parseInitialState';
import createStore from '/store';

import {loadLocale} from '/action/intl.action';

const state = parseInitialState();

const store = createStore(state);

loadLocale();

// setExceptionHandler(renderError)
// setExceptionHandler(renderApp)
renderApp(store);
