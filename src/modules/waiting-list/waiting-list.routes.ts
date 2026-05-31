import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createWaitingListSchema } from './waiting-list.schema';
import { waitingListController } from './waiting-list.controller';

export const waitingListRouter = Router();

waitingListRouter.use(authMiddleware);

waitingListRouter.get('/', waitingListController.findAll);
waitingListRouter.post('/', validate(createWaitingListSchema), waitingListController.create);
waitingListRouter.delete('/:id', waitingListController.remove);
