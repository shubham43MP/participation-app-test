import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { HTTP_STATUS } from '../utils/httpStatus';

describe('UserController', () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockReq = { body: {} };
    mockRes = {
      success: jest.fn(),
      error: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should call UserService.createUser and return success', async () => {
      const mockUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        participationPercentage: 50,
        createdAt: new Date(),
      };
      mockReq.body = {
        firstName: 'John',
        lastName: 'Doe',
        participationPercentage: 50,
      };
      jest.spyOn(UserService, 'createUser').mockResolvedValue(mockUser);

      await UserController.createUser(mockReq, mockRes);

      expect(UserService.createUser).toHaveBeenCalledWith('John', 'Doe', 50);
      expect(mockRes.success).toHaveBeenCalledWith(
        mockUser,
        HTTP_STATUS.CREATED
      );
    });

    it('should handle any errors gracefully', async () => {
      mockReq.body = {
        firstName: 'John',
        lastName: 'Doe',
        participationPercentage: 50,
      };
      jest
        .spyOn(UserService, 'createUser')
        .mockRejectedValue(new Error('DB error'));

      await UserController.createUser(mockReq, mockRes);

      expect(mockRes.error).toHaveBeenCalledWith('Unknown error occurred');
    });
  });

  describe('getUsers', () => {
    it('should return users on success', async () => {
      const mockUsers = [
        {
          id: 1,
          firstName: 'Jane',
          lastName: 'Doe',
          participationPercentage: 30,
          createdAt: new Date(),
        },
      ];
      jest.spyOn(UserService, 'getUsers').mockResolvedValue(mockUsers);

      await UserController.getUsers({} as any, mockRes);

      expect(mockRes.success).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle errors when fetching users', async () => {
      jest
        .spyOn(UserService, 'getUsers')
        .mockRejectedValue(new Error('DB error'));

      await UserController.getUsers({} as any, mockRes);

      expect(mockRes.error).toHaveBeenCalledWith('Unknown error occurred');
    });
  });
});
