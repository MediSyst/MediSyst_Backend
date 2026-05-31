import { UpdateUserInput } from './users.schema';

// TODO: implementar lógica de usuários
export const usersService = {
  async findAll(): Promise<unknown[]> {
    throw new Error('Not implemented');
  },

  async findById(_id: string): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async update(_id: string, _data: UpdateUserInput): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async remove(_id: string): Promise<void> {
    throw new Error('Not implemented');
  },
};
