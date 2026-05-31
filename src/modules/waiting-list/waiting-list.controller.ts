import { Request, Response, NextFunction } from 'express';
import { waitingListService } from './waiting-list.service';

export const waitingListController = {
  async findAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const entries = await waitingListService.findAll();
      res.json(entries);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const entry = await waitingListService.create(req.body);
      res.status(201).json(entry);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await waitingListService.remove(req.params.id as string);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
