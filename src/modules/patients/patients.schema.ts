import { z } from 'zod';

export const createPatientSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10), // Número WhatsApp
  email: z.string().email().optional(),
  notes: z.string().optional(),
});

export const updatePatientSchema = createPatientSchema.partial();

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
