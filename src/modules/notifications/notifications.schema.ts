import { z } from 'zod';

// Payload recebido do N8N quando o paciente responde no WhatsApp
export const n8nCallbackSchema = z.object({
  appointmentId: z.string().uuid(),
  patientPhone: z.string(),
  response: z.enum(['CONFIRM', 'CANCEL', 'OTHER']),
  rawMessage: z.string().optional(),
});

export type N8nCallbackInput = z.infer<typeof n8nCallbackSchema>;
