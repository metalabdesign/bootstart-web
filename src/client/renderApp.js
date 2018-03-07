// @flow

// Import modules ==============================================================
import _ReactDOM from 'react-dom';
import React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import type {RouterHistory} from 'react-router-dom';

import type {Store} from '/store';

// Import components ===========================================================
import AppRoot from '/component/root/AppRoot';

const ReactDOM: {
  ...typeof _ReactDOM,
  hydrate<ElementType: React$ElementType>(
    element: React$Element<ElementType>,
    container: Element,
    callback?: () => void,
  ): React$ElementRef<ElementType>,
  // flowlint unclear-type: off
} = (_ReactDOM: any);
// flowlint unclear-type: error

type Params<S, A, C> = {
  history: RouterHistory,
  store: Store<S, A, C>,
};

const renderApp = <S, A, C>({store, history}: Params<S, A, C>) => {
  const root = document.getElementById(AppRoot.rootElementId);

  if (!root) {
    throw new Error('AppRoot root node missing');
  }

  ReactDOM.hydrate(
    <ConnectedRouter history={history} store={store}>
      <AppRoot store={store} />
    </ConnectedRouter>,
    root,
  );
};

export default renderApp;
