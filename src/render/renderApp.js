import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '/component/root/App';
import Page from '/component/static/Page';

import {navigate, getPath} from 'waygate';

import createStore from '/store';

import extractAssets from './extractAssets';

export default async ({
  path,
  stats,
}) => {
  const store = createStore();
  store.dispatch(navigate(path));
  const markup = ReactDOMServer.renderToString((
    <App store={store}/>
  ));
  const state = store.getState();
  const newPath = getPath(state);
  const redirect = newPath !== path ? newPath : null;
  const page = ReactDOMServer.renderToStaticMarkup((
    <Page
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
