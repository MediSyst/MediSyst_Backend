import { Request, Response, NextFunction } from 'express';
import { notificationsService } from './notifications.service';

export const notificationsController = {
  async handleN8nCallback(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await notificationsService.handleCallback(req.body);
      res.json({ received: true });
    } catch (err) {
      next(err);
    }
  },
};
