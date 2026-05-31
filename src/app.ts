import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error-handler.middleware';

// Rotas dos módulos
import { authRouter } from './modules/auth/auth.routes';
import { usersRouter } from './modules/users/users.routes';
import { patientsRouter } from './modules/patients/patients.routes';
import { appointmentsRouter } from './modules/appointments/appointments.routes';
import { notificationsRouter } from './modules/notifications/notifications.routes';
import { waitingListRouter } from './modules/waiting-list/waiting-list.routes';

export function createApp(): express.Application {
  const app = express();

  // Middlewares globais
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Health check
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Rotas da API
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/patients', patientsRouter);
  app.use('/api/v1/appointments', appointmentsRouter);
  app.use('/api/v1/notifications', notificationsRouter);
  app.use('/api/v1/waiting-list', waitingListRouter);

  // Error handler — deve ser o último middleware
  app.use(errorHandler);

  return app;
}
