const winston = require('winston');
require('winston-daily-rotate-file');

const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
  winston.format.printf((info) => `[${info.timestamp}] ${info.message}`),
);

const logger = winston.createLogger({
  format,
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%.log',
      maxFiles: '14d',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format,
    }),
  );
}

module.exports = logger;
