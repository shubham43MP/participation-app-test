import { UserService } from '../services/user.service';
import { PrismaClient } from '@prisma/client';

jest.mock('@prisma/client', () => {
  const mPrisma = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe('UserService', () => {
  let prisma: any;

  beforeEach(() => {
    prisma = new PrismaClient();
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should call prisma.user.create with correct data', async () => {
      const mockUser = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        participationPercentage: 50,
        createdAt: new Date(),
      };
      prisma.user.create.mockResolvedValue(mockUser);

      const result = await UserService.createUser('John', 'Doe', 50);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          firstName: 'John',
          lastName: 'Doe',
          participationPercentage: 50,
        },
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw if prisma.user.create rejects', async () => {
      prisma.user.create.mockRejectedValue(new Error('DB error'));

      await expect(UserService.createUser('John', 'Doe', 50)).rejects.toThrow(
        'DB error'
      );
    });
  });

  describe('getUsers', () => {
    it('should call prisma.user.findMany and return users', async () => {
      const mockUsers = [
        {
          id: 1,
          firstName: 'Jane',
          lastName: 'Doe',
          participationPercentage: 30,
          createdAt: new Date(),
        },
      ];
      prisma.user.findMany.mockResolvedValue(mockUsers);

      const result = await UserService.getUsers();

      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUsers);
    });

    it('should throw if prisma.user.findMany rejects', async () => {
      prisma.user.findMany.mockRejectedValue(new Error('DB error'));

      await expect(UserService.getUsers()).rejects.toThrow('DB error');
    });
  });
});
