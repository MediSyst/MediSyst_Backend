import { Request, Response, NextFunction } from 'express';
import { appointmentsService } from './appointments.service';

export const appointmentsController = {
  async findAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointments = await appointmentsService.findAll();
      res.json(appointments);
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const doctorId = req.user?.userId ?? '';
      const appointment = await appointmentsService.create(doctorId, req.body);
      res.status(201).json(appointment);
    } catch (err) {
      next(err);
    }
  },

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointment = await appointmentsService.findById(req.params.id as string);
      res.json(appointment);
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointment = await appointmentsService.update(req.params.id as string, req.body);
      res.json(appointment);
    } catch (err) {
      next(err);
    }
  },

  async confirm(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointment = await appointmentsService.confirm(req.params.id as string);
      res.json(appointment);
    } catch (err) {
      next(err);
    }
  },

  async cancel(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const appointment = await appointmentsService.cancel(req.params.id as string);
      res.json(appointment);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await appointmentsService.remove(req.params.id as string);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
