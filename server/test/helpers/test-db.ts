import { afterAll, beforeAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo: MongoMemoryServer;

export async function startTestDatabase(): Promise<void> {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
}

export async function startDatabase(): Promise<void> {
  await startTestDatabase();
}

export async function clearDatabase(): Promise<void> {
  await mongoose.connection.dropDatabase();
}

export async function stopDatabase(): Promise<void> {
  await mongoose.disconnect();
  await mongo.stop();
}

export function setupTestDatabase(): void {
  beforeAll(async () => {
    await startDatabase();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await stopDatabase();
  });
}
