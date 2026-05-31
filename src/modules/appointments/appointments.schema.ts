import { z } from 'zod';

export const createAppointmentSchema = z.object({
  date: z.string().datetime(),
  duration: z.number().int().min(5).default(30),
  patientId: z.string().uuid(),
  notes: z.string().optional(),
});

export const updateAppointmentSchema = createAppointmentSchema.partial();

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>;
