import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';
import { setupTestDatabase } from './helpers/test-db.js';
import { ProjectModel } from '../src/models/project.model.js';
import { projectsResponseSchema } from '@shared/index';

setupTestDatabase();

const app = createApp();

const projectFixture = {
  title: 'E-Commerce Platform',
  category: 'Web App',
  description: 'Full CRUD storefront with JWT authentication.',
  tech: 'React • NodeJS • MongoDB',
  imageUrl: 'https://example.com/ecommerce.jpg',
  alt: 'Moody architectural visualization.',
  url: 'https://github.com/NembieIT',
  accent: 'primary',
};

describe('GET /api/v1/projects', () => {
  it('returns 200 with an empty list when no projects exist', async () => {
    const res = await request(app).get('/api/v1/projects').expect(200);

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toEqual({ data: [], meta: { count: 0 } });
  });

  it('returns 200 with all projects matching the response schema', async () => {
    await ProjectModel.insertMany([
      projectFixture,
      { ...projectFixture, title: 'AI Object Recognition', accent: 'secondary' },
      { ...projectFixture, title: 'AI Agent Workflows', accent: 'inverse-primary' },
    ]);

    const res = await request(app).get('/api/v1/projects').expect(200);

    const parsed = projectsResponseSchema.safeParse(res.body);
    expect(parsed.success).toBe(true);
    expect(parsed.success && res.body.data).toHaveLength(3);
    expect(res.body.meta).toEqual({ count: 3 });
    expect(res.body.data[0]).toMatchObject({ title: 'E-Commerce Platform', accent: 'primary' });
  });

  it('exposes ids but no internal document fields', async () => {
    await ProjectModel.create(projectFixture);

    const res = await request(app).get('/api/v1/projects').expect(200);

    expect(res.body.data[0]).toHaveProperty('id');
    expect(res.body.data[0]).not.toHaveProperty('_id');
    expect(res.body.data[0]).not.toHaveProperty('__v');
  });
});

describe('GET /api/v1/health', () => {
  it('returns 200 with ok status', async () => {
    const res = await request(app).get('/api/v1/health').expect(200);

    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('unknown routes', () => {
  it('returns 404 with the error envelope', async () => {
    const res = await request(app).get('/api/v1/nope').expect(404);

    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
