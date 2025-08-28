import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  static async createUser(
    firstName: string,
    lastName: string,
    participationPercentage: number
  ) {
    return prisma.user.create({
      data: {
        firstName,
        lastName,
        participationPercentage,
      },
    });
  }

  static async getUsers() {
    return prisma.user.findMany();
  }
}
