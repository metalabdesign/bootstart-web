// @flow

// Import modules ==============================================================
import ReactDOM from 'react-dom';
import React from 'react';

// Import components ===========================================================
import AppRoot from '/component/root/AppRoot';

export default (context: *) => {
  const root = document.getElementById(AppRoot.rootElementId);

  if (!root) {
    throw new Error('AppRoot root node missing');
  }

  ReactDOM.hydrate(<AppRoot store={context.store}/>, root);

  return context;
};
