// @flow

// Import modules ==============================================================
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import {StaticRouter} from 'react-router-dom';

// Import types ================================================================
import type {WebpackStats} from '/render/types';

// Import reducer ==============================================================
import reducer from '/reducer';

// Import store ================================================================
import createStore from '/store';

// Import components ===========================================================
import AppRoot from '/component/root/AppRoot';
import Page from '/render/component/Page';

// Import local utils ==========================================================
import extractAssets from './extractAssets';

const renderPath = (path, store) => {
  const routerContext = {};

  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={path} context={routerContext}>
      <AppRoot store={store}/>
    </StaticRouter>
  );

  if (routerContext.url) {
    const status = routerContext.action === 'REPLACE' ? 301 : 302;
    return {
      status,
      redirect: routerContext.url,
      markup: null,
    };
  }

  return {
    status: routerContext.status || 200,
    markup,
    redirect: null,
  };
};

const renderPage = (markup, stats, state) =>
  ReactDOMServer.renderToStaticMarkup((
    <Page
      rootElementId={AppRoot.rootElementId}
      markup={markup}
      assets={extractAssets(stats)}
      state={state}
    />
  ));

type Options = {
  path: string,
  stats: WebpackStats,
};

const renderApp = async ({path, stats}: Options) => {
  const history = createHistory();

  const context = {
    history,
  };

  const store = createStore({
    history,
    context,
    reducer,
  });

  const result = renderPath(path, store);

  if (result.markup !== null) {
    const page = renderPage(result.markup, stats, store.getState());
    const markup = `<!DOCTYPE html>${page}`;
    return {...result, markup};
  }

  return result;
};

export default renderApp;
