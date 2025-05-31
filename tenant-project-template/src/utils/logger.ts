import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';

const logFile = path.resolve(__dirname, '../../../logs/app.log');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      (info: any) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),
  transports: [
    new transports.File({ filename: logFile, maxsize: 10485760, maxFiles: 5 }),
    new transports.Console({ format: format.simple() }),
  ],
});

export default logger;
