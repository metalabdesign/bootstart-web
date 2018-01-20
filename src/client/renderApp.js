/* @flow */
import type {Store} from '/types';
import App from '/component/root/App';
import ReactDOM from 'react-dom';
import React from 'react';

const getAppRootNode = (): Element => {
  const element = document.getElementById('app');
  if (!element) {
    throw new Error();
  }
  return element;
};

/**
 * Render the `<App>` component into the DOM.
 *
 * @param {Store} store A Redux store object.
 * @returns {void}
 */
const renderApp = (store: Store): void => {
  const element = getAppRootNode();
  ReactDOM.hydrate(<App store={store}/>, element);
};

export default renderApp;
