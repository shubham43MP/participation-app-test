import { HealthController } from '../controllers/health.controller';
import { HealthService } from '../services/health.service';
import { Request, Response } from 'express';

describe('HealthController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {} as Partial<Request>;
    mockRes = {} as Partial<Response>;
    jest.clearAllMocks();
  });

  it('should delegate to HealthService.handleHealthService', () => {
    const spy = jest
      .spyOn(HealthService, 'handleHealthService')
      .mockImplementation();

    HealthController.handleHealthController(
      mockReq as Request,
      mockRes as Response
    );

    expect(spy).toHaveBeenCalledWith(mockReq, mockRes);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
