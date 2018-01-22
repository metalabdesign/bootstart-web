import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Error from '/component/root/Error';
import Page from '/component/static/Page';

import extractAssets from './extractAssets';

export default async ({
  error,
  stats,
  preload,
}) => {
  const markup = ReactDOMServer.renderToString((
    <Error error={error}/>
  ));
  const page = ReactDOMServer.renderToStaticMarkup((
    <Page
      markup={markup}
      assets={extractAssets(stats)}
      preload={preload}
    />
  ));
  return Promise.resolve({
    markup: `<!DOCTYPE html>${page}`,
    status: error.status || error.statusCode || 500,
  });
};
