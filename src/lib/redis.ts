import { env } from '../config/env';

// Configuração de conexão Redis compartilhada para BullMQ
// BullMQ usa sua própria versão interna do ioredis, então passamos as opções diretamente
export const redisConnection = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
};
