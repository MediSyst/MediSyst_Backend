import { CreateWaitingListInput } from './waiting-list.schema';

// TODO: implementar lógica da fila de espera
export const waitingListService = {
  async findAll(): Promise<unknown[]> {
    throw new Error('Not implemented');
  },

  async create(_data: CreateWaitingListInput): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async remove(_id: string): Promise<void> {
    throw new Error('Not implemented');
  },

  /**
   * Tenta encaixar pacientes da fila de espera em um horário que ficou vago.
   * Chamado automaticamente quando uma consulta é cancelada.
   */
  async tryFillVacancy(_doctorId: string, _vacantDate: Date): Promise<void> {
    // TODO: buscar pacientes na fila, notificar o primeiro disponível
    throw new Error('Not implemented');
  },
};
