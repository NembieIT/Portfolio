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

export function createApp(): express.Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
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

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
