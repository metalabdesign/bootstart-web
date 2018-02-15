// @flow

// Import modules ==============================================================
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Import types ================================================================
import type {WebpackStats} from '/render/types';

// Import components ===========================================================
import ErrorRoot from '/component/root/ErrorRoot';
import Page from '/render/component/Page';

// Import local utils ==========================================================
import extractAssets from './extractAssets';

type StatusError = {status?: string | number, statusCode?: string | number};

const getStatus = (error: StatusError) => {
  const status = parseInt(error.status, 10);

  if (!isNaN(status)) {
    return status;
  }

  const statusCode = parseInt(error.statusCode, 10);

  if (!isNaN(statusCode)) {
    return statusCode;
  }

  return 500;
};

type Options = {
  error: Error,
  path?: string,
  stats: WebpackStats,
};

export default async ({
  error,
  stats,
}: Options) => {
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
    status: getStatus(error),
  });
};
