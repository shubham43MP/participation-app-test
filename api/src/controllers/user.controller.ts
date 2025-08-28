import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, participationPercentage } = req.body;
      const user = await UserService.createUser(
        firstName,
        lastName,
        participationPercentage
      );
      res.status(201).json({ success: true, data: user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: 'Unknown error occurred' });
      }
    }
  }

  static async getUsers(_req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.status(200).json({ success: true, data: users });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, message: error.message });
      } else {
        res
          .status(500)
          .json({ success: false, message: 'Unknown error occurred' });
      }
    }
  }
}
