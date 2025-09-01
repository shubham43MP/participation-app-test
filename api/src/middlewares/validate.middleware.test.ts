import { validate } from '../middlewares/validate.middleware';
import Joi from 'joi';
import { Request, Response } from 'express';

describe('validate middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let next: jest.Mock;

  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().min(18),
  });

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('should return 400 if validation fails', () => {
    mockReq.body = { age: 10 };

    validate(schema)(mockReq as Request, mockRes as Response, next);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: expect.any(Array),
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if validation succeeds', () => {
    mockReq.body = { name: 'John', age: 25 };

    validate(schema)(mockReq as Request, mockRes as Response, next);

    expect(next).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });
});
