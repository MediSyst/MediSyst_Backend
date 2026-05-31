import { PrismaClient } from '@prisma/client';

// Singleton — reutiliza a mesma instância em toda a aplicação
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
});
