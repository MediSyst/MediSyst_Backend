import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { n8nCallbackSchema } from './notifications.schema';
import { notificationsController } from './notifications.controller';

// Rotas de webhook — chamadas pelo N8N, sem autenticação JWT
export const notificationsRouter = Router();

// Webhook recebe resposta do paciente via N8N
notificationsRouter.post('/webhook/n8n', validate(n8nCallbackSchema), notificationsController.handleN8nCallback);
