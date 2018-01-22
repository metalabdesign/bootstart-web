/* @flow */
// =============================================================================
// Import modules.
// =============================================================================
import {
  compose,
  match,
  send,
  status,
  connect,
} from 'midori';
import http from 'http';
import {path} from 'midori/match';

// import common from '/server/common';
import app from './app';
import polyfill from './polyfill';

const createApp = compose(
  // common,
  match(path('/favicon.ico'), compose(status(404), send(''))),
  polyfill,
  app,
);

const server = connect(createApp(), http.createServer());

server.listen(process.env.PORT, () => {
  const {port} = server.address();
  console.log('Server listening on', port);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
