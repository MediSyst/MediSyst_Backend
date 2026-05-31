import { z } from 'zod';

export const createWaitingListSchema = z.object({
  patientId: z.string().uuid(),
  doctorId: z.string().uuid().optional(),
  preferredDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export type CreateWaitingListInput = z.infer<typeof createWaitingListSchema>;
