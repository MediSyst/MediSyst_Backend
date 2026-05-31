import { RegisterInput, LoginInput } from './auth.schema';

// TODO: implementar lógica de autenticação
export const authService = {
  async register(_data: RegisterInput): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async login(_data: LoginInput): Promise<unknown> {
    throw new Error('Not implemented');
  },

  async refresh(_refreshToken: string): Promise<unknown> {
    throw new Error('Not implemented');
  },
};
