import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema } from '../validations/user.validation';

const router = Router();

router.post('/users', validate(createUserSchema), UserController.createUser);
router.get('/users', UserController.getUsers);

export default router;
