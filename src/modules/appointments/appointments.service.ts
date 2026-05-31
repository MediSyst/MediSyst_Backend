import { CreateAppointmentInput, UpdateAppointmentInput } from './appointments.schema';

// TODO: implementar lógica de consultas
export const appointmentsService = {
  async findAll(): Promise<unknown[]> {
    throw new Error('Not implemented');
  },

  async create(_doctorId: string, _data: CreateAppointmentInput): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async findById(_id: string): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async update(_id: string, _data: UpdateAppointmentInput): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async confirm(_id: string): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async cancel(_id: string): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async remove(_id: string): Promise<void> {
    throw new Error('Not implemented');
  },
};
