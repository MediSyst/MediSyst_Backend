import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createAppointmentSchema, updateAppointmentSchema } from './appointments.schema';
import { appointmentsController } from './appointments.controller';

export const appointmentsRouter = Router();

appointmentsRouter.use(authMiddleware);

appointmentsRouter.get('/', appointmentsController.findAll);
appointmentsRouter.post('/', validate(createAppointmentSchema), appointmentsController.create);
appointmentsRouter.get('/:id', appointmentsController.findById);
appointmentsRouter.patch('/:id', validate(updateAppointmentSchema), appointmentsController.update);
appointmentsRouter.patch('/:id/confirm', appointmentsController.confirm);
appointmentsRouter.patch('/:id/cancel', appointmentsController.cancel);
appointmentsRouter.delete('/:id', appointmentsController.remove);
