// @flow

// Import modules ==============================================================
import {
  compose,
  graceful,
  timing,
  logging,
  secure,
  id,
  compression,
  status,
  send,
  next,
  get,
} from 'midori';

import createWebpackMiddleware from './createWebpackMiddleware';
import createPageMiddleware from './createPageMiddleware';
import createErrorHandler from './createErrorHandler';

/**
 * Compose various middleware to create the final app.
 * @returns {*} App thing.
 */
const createApp = () => {
  return compose(
    // Gracefully end incoming responses if the server is shutting down.
    graceful(),
    // Attach timing information to the HTTP request and response objects.
    timing(),
    // Log handled requests to the server log.
    logging(),
    // Set security headers to prevent common browser security vulnerabilities
    // see: https://www.owasp.org/index.php/OWASP_Secure_Headers_Project
    __DEV__ ? next : secure(),
    // Attach a unique ID to each request (at req.id and as header Request-Id)
    // for correlation with other events. It can be referenced by other modules,
    // other logging systems or even the front-end client
    id(),
    // Enable gzip compression using the `compression` module.
    compression(),
    // Blackhole requests for favicon.ico
    get('/favicon.ico', status(404), send('')),
    // Serve existing webpack assets.
    createWebpackMiddleware(),
    // Render the app.
    createPageMiddleware(),
    // Handle any errors.
    createErrorHandler(),
  );
};

export default createApp;
