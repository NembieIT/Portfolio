import type { Server } from 'node:http';
import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './lib/database.js';
import { logger } from './lib/logger.js';

async function bootstrap(): Promise<void> {
  const app = createApp();

  await connectDatabase(env.MONGODB_URI);

  const server: Server = app.listen(env.PORT, () => {
    logger.info({ port: env.PORT }, 'Lumina Noir API listening');
  });

  let shuttingDown = false;

  const shutdown = (signal: NodeJS.Signals) => {
    if (shuttingDown) return;
    shuttingDown = true;

    logger.info({ signal }, 'Shutting down gracefully');

    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });

    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

bootstrap().catch((err: unknown) => {
  logger.error({ err }, 'Failed to start API');
  process.exit(1);
});
