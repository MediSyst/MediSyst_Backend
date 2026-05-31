import { env } from '../../config/env';
import { N8nCallbackInput } from './notifications.schema';

export const notificationsService = {
  /**
   * Envia mensagem WhatsApp via N8N.
   * Chamado pelo reminders.worker.ts quando um job é processado.
   */
  async sendWhatsApp(_payload: {
    phone: string;
    appointmentId: string;
    patientName: string;
    doctorName: string;
    appointmentDate: string;
  }): Promise<void> {
    if (!env.N8N_WEBHOOK_URL) {
      throw new Error('N8N_WEBHOOK_URL não configurado');
    }
    // TODO: fazer POST para env.N8N_WEBHOOK_URL com o payload
    throw new Error('Not implemented');
  },

  /**
   * Processa a resposta do paciente recebida via N8N.
   * Atualiza o status da consulta conforme a resposta (CONFIRM / CANCEL).
   */
  async handleCallback(_data: N8nCallbackInput): Promise<void> {
    // TODO: atualizar status da consulta e disparar fluxo adequado
    throw new Error('Not implemented');
  },
};
