import renderApp from './renderApp';
import parseInitialState from './parseInitialState';
import createStore from '/store';

const state = parseInitialState();

const store = createStore(state);

// setExceptionHandler(renderError)
// setExceptionHandler(renderApp)
renderApp(store);
