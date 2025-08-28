import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

// Create user
router.post('/users', UserController.createUser);

// Get all users
router.get('/users', UserController.getUsers);

export default router;
