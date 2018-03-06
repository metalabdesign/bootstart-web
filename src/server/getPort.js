// @flow

/**
 * Get port.
 * @returns {Number} Port.
 */
const getPort = (): number => {
  if (typeof process.env.PORT === 'string') {
    const port = parseInt(process.env.PORT, 10);
    if (typeof port === 'number' && !Number.isNaN(port)) {
      return port;
    }
    throw new TypeError('Invalid `PORT` value specified.');
  }
  return 8080;
};

export default getPort;
