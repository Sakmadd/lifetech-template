import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Response {
      /**
       * Mengirim response sukses
       * @param data - Data yang akan dikirim dalam response
       * @param message - Pesan sukses (default: 'Success')
       * @param statusCode - HTTP status code (default: 200)
       * @param meta - Metadata tambahan (opsional)
       */
      success: <T>(
        data?: T,
        message?: string,
        statusCode?: number,
        meta?: any
      ) => void;

      /**
       * Mengirim response error
       * @param code - Kode error yang unik
       * @param message - Pesan error
       * @param statusCode - HTTP status code (default: 400)
       * @param details - Detail error tambahan (opsional)
       */
      error: (exception: Exception) => void;
    }
  }
}

export class Exception extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public details?: any
  ) {
    super(message);
  }
}

export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = <T>(
    data?: T,
    message = 'Success',
    statusCode = 200,
    meta?: any
  ) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
    });
  };

  res.error = (exception: Exception) => {
    res.status(exception.statusCode).json({
      success: false,
      message: exception.message,
      details: exception.details,
    });
  };

  next();
};
