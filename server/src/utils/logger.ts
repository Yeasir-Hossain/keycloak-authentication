import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

/**
 * Enumerates over error messages
 */
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

/**
 * Daily Rotate File Transport for Errors
 */
const errorFileTransport = new DailyRotateFile({
  dirname: 'logs', // Directory where logs are stored
  filename: 'errors-%DATE%.log', // File naming pattern
  datePattern: 'YYYY-MM-DD', // Daily rotation
  zippedArchive: true,
  maxSize: '5m',
  maxFiles: '1d',
  level: 'error',
});

/**
 * Winston Logger Configuration
 */
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.NODE_ENV === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    errorFileTransport,
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '5m',
      maxFiles: '1d',
    }),
  ],
});

export default logger;
