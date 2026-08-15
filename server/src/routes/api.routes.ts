import { Router, type RequestHandler } from 'express';
import { listProjects } from '../services/project.service.js';
import { submitContactMessage } from '../services/contact.service.js';
import { contactMessageSchema } from '@shared/index';

export function createApiRouter(contactLimiter: RequestHandler): Router {
  const apiRouter = Router();

  apiRouter.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  apiRouter.get('/projects', async (_req, res) => {
    const data = await listProjects();
    res.json({ data, meta: { count: data.length } });
  });

  apiRouter.post('/messages/contact', contactLimiter, async (req, res) => {
    const input = contactMessageSchema.parse(req.body);
    const data = await submitContactMessage(input);
    res.status(201).json({ data });
  });

  return apiRouter;
}
