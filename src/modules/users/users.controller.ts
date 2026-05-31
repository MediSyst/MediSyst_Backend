import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';

export const usersController = {
  async findAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await usersService.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await usersService.findById(req.params.id as string);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await usersService.update(req.params.id as string, req.body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await usersService.remove(req.params.id as string);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
