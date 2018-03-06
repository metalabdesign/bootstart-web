// @flow

// Import modules ==============================================================
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import {StaticRouter} from 'react-router-dom';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';

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

const renderPage = (props) => ReactDOMServer.renderToStaticMarkup((
  <Page
    rootElementId={AppRoot.rootElementId}
    {...props}
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

  const routerContext = {};
  const sheet = new ServerStyleSheet();

  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={path} context={routerContext}>
      <StyleSheetManager sheet={sheet.instance}>
        <AppRoot store={store}/>
      </StyleSheetManager>
    </StaticRouter>
  );

  if (routerContext.url) {
    const status = routerContext.action === 'REPLACE' ? 301 : 302;
    return {
      status,
      redirect: routerContext.url,
      markup: '',
    };
  }

  const page = renderPage({
    assets: extractAssets(stats),
    head: sheet.getStyleElement(),
    state: store.getState(),
    markup,
  });
  return {
    status: routerContext.status || 200,
    markup: `<!DOCTYPE html>${page}`,
  };
};

export default renderApp;
