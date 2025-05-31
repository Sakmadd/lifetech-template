import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../services/jwt.service';
import { JwtPayloadSchemaType } from '../validations/jwt.validation';
import { Exception } from './response.middleware';
import logger from '../utils/logger';
import { Role } from '../../generated/prisma';
import { ENV } from '../config/environment';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadSchemaType;
    }
  }
}

export const authMiddleware = (roles?: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    logger.info('Auth middleware called', {
      path: req.path,
      method: req.method,
      roles: roles,
    });

    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.error(
          new Exception('UNAUTHORIZED', 401, 'No token provided')
        );
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.error(
          new Exception('UNAUTHORIZED', 401, 'No token provided')
        );
      }

      const decoded = await JwtService.getInstance().verifyToken(token);

      if (!decoded) {
        return res.error(new Exception('UNAUTHORIZED', 401, 'Invalid token'));
      }

      if (decoded.iss !== ENV.JWT_ISSUER) {
        return res.error(
          new Exception('UNAUTHORIZED', 401, 'Invalid token issuer')
        );
      }

      if (decoded.role === 'SUPERADMIN') {
        req.user = decoded;
        return next();
      }

      if (!decoded.aud.includes(ENV.JWT_AUDIENCE)) {
        return res.error(
          new Exception('UNAUTHORIZED', 401, 'Invalid token audience')
        );
      }

      if (roles && roles.length > 0) {
        if (!decoded.role || !roles.includes(decoded.role)) {
          return res.error(
            new Exception(
              'UNAUTHORIZED',
              403,
              'You do not have permission to access this resource'
            )
          );
        }
      }

      req.user = decoded;
      next();
    } catch (error: any) {
      logger.error('Auth middleware error', {
        error: error.message,
        stack: error.stack,
      });

      if (error.name === 'TokenExpiredError') {
        return res.error(new Exception('UNAUTHORIZED', 401, 'Token expired'));
      }
      return res.error(new Exception('UNAUTHORIZED', 401, 'Invalid token'));
    }
  };
};
