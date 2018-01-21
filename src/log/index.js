/* @flow */
/* eslint-disable no-console */

type LogLevel = 'debug' | 'info' | 'error' | 'warn';
type LogObject = {
  message: string,
  level: LogLevel,
  [string]: any,
};
type LogMessage = string | LogObject;
type LogEntry = (() => LogMessage)
| LogMessage;

const getLogObject = (
  level: LogLevel,
  entry: LogEntry
): LogObject => {
  if (typeof entry === 'string') {
    return {message: entry, level};
  } else if (typeof entry === 'function') {
    return getLogObject(level, entry());
  } else if (entry && (typeof entry === 'object')) {
    return entry;
  }
  return {message: 'Unable to log entry.', level: 'error'};
};

const printLogMessage = (msg: LogObject) => {
  console[msg.level](msg.message);
  if (msg.error && msg.error.stack) {
    console[msg.level](msg.error.stack);
  }
};

const createLog = (level: LogLevel) => (msg: LogEntry) => {
  const object = getLogObject(level, msg);
  printLogMessage(object);
};

export const debug = createLog('debug');
export const info = createLog('info');
export const warn = createLog('warn');
export const error = createLog('error');

export default {
  debug,
  info,
  warn,
  error,
};
