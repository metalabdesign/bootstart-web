// @flow

// Import modules ==============================================================
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {navigate, getPath} from 'waygate';
import {pipe} from 'ramda';

// Import types ================================================================
import type {WebpackStats} from '/types';

// Import components ===========================================================
import AppRoot from '/component/root/AppRoot';
import Page from '/component/static/Page';

import createStore from '/store';

import extractAssets from './extractAssets';

type RenderOptions = {
  path: string,
  stats: WebpackStats,
};

const renderApp = async ({path, stats}: RenderOptions) => {
  const context = pipe(
    createStore,
  )(Object.freeze({}));

  const {store} = context;

  store.dispatch(navigate(path));
  const markup = ReactDOMServer.renderToString((
    <AppRoot store={store}/>
  ));
  const state = store.getState();
  const newPath = getPath(state);
  const redirect = newPath !== path ? newPath : null;
  const page = ReactDOMServer.renderToStaticMarkup((
    <Page
      rootId={AppRoot.rootNodeId}
      markup={markup}
      assets={extractAssets(stats)}
      redirect={redirect}
      state={state}
    />
  ));
  return Promise.resolve({
    markup: `<!DOCTYPE html>${page}`,
    redirect,
  });
};

export default renderApp;
