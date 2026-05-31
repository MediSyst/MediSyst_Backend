import { CreatePatientInput, UpdatePatientInput } from './patients.schema';

// TODO: implementar lógica de pacientes
export const patientsService = {
  async findAll(): Promise<unknown[]> {
    throw new Error('Not implemented');
  },

  async create(_data: CreatePatientInput): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async findById(_id: string): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async update(_id: string, _data: UpdatePatientInput): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async remove(_id: string): Promise<void> {
    throw new Error('Not implemented');
  },
};
