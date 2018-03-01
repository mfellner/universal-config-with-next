// Ensure `debug` is enabled.
if (typeof localStorage !== 'undefined') {
  localStorage.setItem('debug', 'app:*');
} else {
  process.env['DEBUG'] = 'app:*';
}

import * as debug from 'debug';
import conf from './conf';

const loggers = {
  debug: { log: debug('app:debug'), level: 0 },
  info: { log: debug('app:info'), level: 1 },
  warn: { log: debug('app:warn'), level: 2 },
  error: { log: debug('app:error'), level: 3 }
};

type LogLevel = keyof typeof loggers;

const logLevel = conf.getString('logLevel', 'info');
const logLevelNumber = logLevel in loggers ? loggers[logLevel as LogLevel].level : 1;

function log(level: LogLevel, message: string, args: any[]) {
  const logger = loggers[level];
  if (logger.level >= logLevelNumber) {
    logger.log(message, ...args);
  }
}

export default {
  debug(message: string, ...args: any[]) {
    log('debug', message, args);
  },
  warn(message: string, ...args: any[]) {
    log('warn', message, args);
  },
  info(message: string, ...args: any[]) {
    log('info', message, args);
  },
  error(message: string, ...args: any[]) {
    log('error', message, args);
  }
};
