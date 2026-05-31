import { Queue } from 'bullmq';
import { redisConnection } from '../../lib/redis';

// Fila de lembretes — jobs são criados aqui e processados pelo worker
export const remindersQueue = new Queue('reminders', { connection: redisConnection });

export const remindersService = {
  /**
   * Agenda um lembrete para ser enviado X horas antes da consulta.
   * O delay é calculado em milissegundos a partir de agora até o horário do lembrete.
   */
  async scheduleReminder(_appointmentId: string, _appointmentDate: Date, _hoursBefore: number): Promise<void> {
    // TODO: calcular delay e adicionar job na fila
    throw new Error('Not implemented');
  },

  /**
   * Remove os jobs de lembrete de uma consulta cancelada ou remarcada.
   */
  async cancelReminder(_appointmentId: string): Promise<void> {
    // TODO: remover jobs da fila pelo appointmentId
    throw new Error('Not implemented');
  },
};
