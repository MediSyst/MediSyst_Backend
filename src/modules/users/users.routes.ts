import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { usersController } from './users.controller';

export const usersRouter = Router();

usersRouter.use(authMiddleware);

usersRouter.get('/', usersController.findAll);
usersRouter.get('/:id', usersController.findById);
usersRouter.patch('/:id', usersController.update);
usersRouter.delete('/:id', usersController.remove);
