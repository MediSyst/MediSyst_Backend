import { env } from './config/env';
import { createApp } from './app';
import { prisma } from './lib/prisma';

async function bootstrap(): Promise<void> {
  const app = createApp();

  // Inicia o servidor
  app.listen(env.PORT, () => {
    console.log(`🚀 MediSyst API rodando em http://localhost:${env.PORT}`);
    console.log(`🌍 Ambiente: ${env.NODE_ENV}`);
  });

  // Graceful shutdown
  const shutdown = async (): Promise<void> => {
    console.log('\n🛑 Encerrando servidor...');
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((err) => {
  console.error('❌ Erro ao iniciar servidor:', err);
  process.exit(1);
});
