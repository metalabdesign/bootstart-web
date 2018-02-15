// @flow

// Import modules ==============================================================
// flowlint untyped-import: off
import {compose, match, send, status, connect} from 'midori';
// flowlint untyped-import: error
import http from 'http';
import {path} from 'midori/match';
import type {Hub} from 'webpack-udev-server';

// import common from '/server/common';
import app from './app';

const createApp = (hub?: Hub) => compose(
  // common,
  match(path('/favicon.ico'), compose(status(404), send(''))),
  app(hub),
);

const server = connect(createApp()(), http.createServer());

server.listen(process.env.PORT, () => {
  const {port} = server.address();
  console.log('Server listening on', port);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
