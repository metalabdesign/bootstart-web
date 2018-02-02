import React from 'react';
import ReactDOMServer from 'react-dom/server';

import ErrorRoot from '/component/root/ErrorRoot';
import Page from '/render/component/Page';

import extractAssets from './extractAssets';

export default async ({
  error,
  stats,
}) => {
  const markup = ReactDOMServer.renderToString((
    <ErrorRoot error={error}/>
  ));
  const page = ReactDOMServer.renderToStaticMarkup((
    <Page
      rootElementId={ErrorRoot.rootElementId}
      markup={markup}
      assets={extractAssets(stats)}
    />
  ));
  return Promise.resolve({
    markup: `<!DOCTYPE html>${page}`,
    statusCode: error.status || error.statusCode || 500,
  });
};
