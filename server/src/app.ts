import { fileURLToPath } from 'node:url';
import path from 'node:path';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { env } from './config/env.js';
import { httpLogger } from './lib/logger.js';
import { createApiRouter } from './routes/api.routes.js';
import { notFoundHandler } from './middleware/not-found.js';
import { errorHandler } from './middleware/error-handler.js';
import { createContactRateLimiter } from './middleware/rate-limit.js';
import { HttpError } from './lib/http-error.js';

const allowedOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim());

const clientDistDir = fileURLToPath(new URL('../../client/dist', import.meta.url));
const clientIndexHtml = path.join(clientDistDir, 'index.html');

export function createApp(): express.Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'font-src': ["'self'", 'https:', 'data:'],
          'style-src': ["'self'", "'unsafe-inline'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:'],
          'connect-src': ["'self'"],
        },
      },
    }),
  );
  app.use(
    cors({
      origin: allowedOrigins.includes('*')
        ? true
        : (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
              return;
            }
            callback(new HttpError(403, 'CORS_NOT_ALLOWED', 'Origin not allowed by CORS'));
          },
    }),
  );
  app.use(compression());
  app.use(express.json({ limit: '10kb' }));
  app.use(httpLogger);

  app.use('/api/v1', createApiRouter(createContactRateLimiter()));

  app.use(
    '/assets',
    express.static(path.join(clientDistDir, 'assets'), {
      maxAge: '30d',
      immutable: true,
    }),
  );
  app.use(express.static(clientDistDir, { maxAge: '1h' }));
  app.use((req, res, next) => {
    if (req.method === 'GET' || req.method === 'HEAD') {
      if (!req.path.startsWith('/api/')) {
        res.setHeader('Cache-Control', 'no-store');
        res.sendFile(clientIndexHtml);
        return;
      }
    }
    next();
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
