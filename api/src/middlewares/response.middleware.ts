import { Response, Request, NextFunction } from 'express';
import { HTTP_STATUS } from '../utils/httpStatus';

export const responseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = (data: unknown, status = HTTP_STATUS.OK) => {
    return res.status(status).json({ success: true, data });
  };

  res.error = (message: string, status = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
    return res.status(status).json({ success: false, message });
  };

  next();
};

// Extend Express Response type globally
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Response {
      success: (data: unknown, status?: number) => Response;
      error: (message: string, status?: number) => Response;
    }
  }
}
