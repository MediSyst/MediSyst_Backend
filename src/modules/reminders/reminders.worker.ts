import { Worker, Job } from 'bullmq';
import { redisConnection } from '../../lib/redis';

export interface ReminderJobData {
  appointmentId: string;
  patientPhone: string;
  patientName: string;
  appointmentDate: string;
  doctorName: string;
}

// Worker que processa jobs da fila de lembretes
export const remindersWorker = new Worker<ReminderJobData>(
  'reminders',
  async (job: Job<ReminderJobData>) => {
    console.log(`📩 Processando lembrete: appointment=${job.data.appointmentId}`);
    // TODO: chamar notificationsService para enviar via N8N/WhatsApp
    throw new Error('Not implemented');
  },
  { connection: redisConnection },
);

remindersWorker.on('completed', (job) => {
  console.log(`✅ Lembrete enviado: job=${job.id}`);
});

remindersWorker.on('failed', (job, err) => {
  console.error(`❌ Erro ao enviar lembrete: job=${job?.id}`, err);
});
