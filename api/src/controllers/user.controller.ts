import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { HTTP_STATUS } from '../utils/httpStatus';

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, participationPercentage } = req.body;

      if (!firstName || !lastName || participationPercentage == null) {
        return res.error('Missing required fields', HTTP_STATUS.BAD_REQUEST);
      }
      const user = await UserService.createUser(
        firstName,
        lastName,
        participationPercentage
      );
      res.success(user, HTTP_STATUS.CREATED);
    } catch (error: unknown) {
      res.error('Unknown error occurred');
    }
  }

  static async getUsers(_req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.success(users);
    } catch (error: unknown) {
      res.error('Unknown error occurred');
    }
  }
}
