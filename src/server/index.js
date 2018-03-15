// @flow

// Import modules ==============================================================
import {listen} from 'midori';

import getPort from './getPort';
import createApp from './createApp';

const app = createApp();

const server = listen(app, getPort(), () => {
  const {port} = server.address();
  console.log('Server listening on', port);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});
