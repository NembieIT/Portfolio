import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import type { Express } from 'express';
import { createApp } from '../src/app.js';
import { setupTestDatabase } from './helpers/test-db.js';
import { ContactMessageModel } from '../src/models/contact-message.model.js';
import { contactMessageResponseSchema } from '@shared/index';

setupTestDatabase();

let app: Express;

beforeEach(() => {
  // Fresh app per test so the in-memory rate limiter quota is not shared between tests.
  app = createApp();
});

const validPayload = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Let\u2019s build something extraordinary.',
};

describe('POST /api/v1/messages/contact', () => {
  it('returns 201 and persists the message for a valid payload', async () => {
    const res = await request(app).post('/api/v1/messages/contact').send(validPayload).expect(201);

    const parsed = contactMessageResponseSchema.safeParse(res.body);
    expect(parsed.success).toBe(true);

    const stored = await ContactMessageModel.findById(res.body.data.id).lean();
    expect(stored).toMatchObject(validPayload);
  });

  it.each([
    { name: 'bad email', payload: { ...validPayload, email: 'not-an-email' } },
    { name: 'missing name', payload: { email: 'ada@example.com', message: 'Hi' } },
    { name: 'empty message', payload: { ...validPayload, message: '   ' } },
    { name: 'message too long', payload: { ...validPayload, message: 'x'.repeat(2001) } },
    { name: 'non-object body', payload: 'hello' },
  ])('returns 400 with validation details for $name', async ({ payload }) => {
    const res = await request(app).post('/api/v1/messages/contact').send(payload).expect(400);

    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.details).toBeDefined();
  });

  it('returns 400 for malformed JSON', async () => {
    const res = await request(app)
      .post('/api/v1/messages/contact')
      .set('Content-Type', 'application/json')
      .send('{"name":')
      .expect(400);

    expect(res.body.error.code).toBe('INVALID_JSON');
  });

  it('returns 429 after exceeding the rate limit', async () => {
    // Sequential requests guarantee deterministic arrival order (parallel requests race the counter).
    for (let i = 0; i < 20; i += 1) {
      await request(app).post('/api/v1/messages/contact').send(validPayload).expect(201);
    }

    const blocked = await request(app)
      .post('/api/v1/messages/contact')
      .send(validPayload)
      .expect(429);
    expect(blocked.body.error.code).toBe('RATE_LIMITED');

    const stored = await ContactMessageModel.countDocuments();
    expect(stored).toBe(20);
  }, 45_000);

  it('rejects CORS requests from unauthorized origins', async () => {
    await request(app)
      .post('/api/v1/messages/contact')
      .set('Origin', 'https://evil.example.com')
      .send(validPayload)
      .expect(403);
  });
});
