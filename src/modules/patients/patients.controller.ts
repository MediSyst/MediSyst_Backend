import { Request, Response, NextFunction } from 'express';
import { patientsService } from './patients.service';

export const patientsController = {
  async findAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const patients = await patientsService.findAll();
      res.json(patients);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const patient = await patientsService.create(req.body);
      res.status(201).json(patient);
    } catch (err) {
      next(err);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const patient = await patientsService.findById(req.params.id as string);
      res.json(patient);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const patient = await patientsService.update(req.params.id as string, req.body);
      res.json(patient);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await patientsService.remove(req.params.id as string);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
