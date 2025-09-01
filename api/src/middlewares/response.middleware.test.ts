import { responseMiddleware } from '../middlewares/response.middleware';
import { HTTP_STATUS } from '../utils/httpStatus';
import { Request, Response } from 'express';

describe('responseMiddleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('should attach success and error methods to res and call next', () => {
    responseMiddleware(mockReq as Request, mockRes as Response, next);

    expect(typeof mockRes.success).toBe('function');
    expect(typeof mockRes.error).toBe('function');
    expect(next).toHaveBeenCalled();
  });

  it('res.success should send success response with default status', () => {
    responseMiddleware(mockReq as Request, mockRes as Response, next);

    mockRes.success?.({ foo: 'bar' });

    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: { foo: 'bar' },
    });
  });

  it('res.success should send success response with custom status', () => {
    responseMiddleware(mockReq as Request, mockRes as Response, next);

    mockRes.success?.('custom data', HTTP_STATUS.CREATED);

    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: 'custom data',
    });
  });

  it('res.error should send error response with default status', () => {
    responseMiddleware(mockReq as Request, mockRes as Response, next);

    mockRes.error?.('Something went wrong');

    expect(mockRes.status).toHaveBeenCalledWith(
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Something went wrong',
    });
  });

  it('res.error should send error response with custom status', () => {
    responseMiddleware(mockReq as Request, mockRes as Response, next);

    mockRes.error?.('Bad request', HTTP_STATUS.BAD_REQUEST);

    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      message: 'Bad request',
    });
  });
});
