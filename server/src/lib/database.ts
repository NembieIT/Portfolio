import mongoose from 'mongoose';
import { logger } from './logger.js';

export async function connectDatabase(uri: string): Promise<void> {
  mongoose.connection.on('error', (err) => {
    logger.error({ err }, 'MongoDB connection error');
  });

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  logger.info({ uri }, 'Connected to MongoDB');
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info('Disconnected from MongoDB');
}
