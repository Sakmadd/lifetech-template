import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(
    `${req.method} ${req.originalUrl} - IP: ${req.ip} - Body: ${JSON.stringify(
      req.body
    )}`
  );
  next();
};

export default requestLogger;
