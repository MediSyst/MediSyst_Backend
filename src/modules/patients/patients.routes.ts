import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createPatientSchema, updatePatientSchema } from './patients.schema';
import { patientsController } from './patients.controller';

export const patientsRouter = Router();

patientsRouter.use(authMiddleware);

patientsRouter.get('/', patientsController.findAll);
patientsRouter.post('/', validate(createPatientSchema), patientsController.create);
patientsRouter.get('/:id', patientsController.findById);
patientsRouter.patch('/:id', validate(updatePatientSchema), patientsController.update);
patientsRouter.delete('/:id', patientsController.remove);
