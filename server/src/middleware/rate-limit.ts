import type { RequestHandler } from 'express';
import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env.js';

export function createContactRateLimiter(): RequestHandler {
  return rateLimit({
    windowMs: 60_000,
    limit: env.RATE_LIMIT_MAX,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many messages sent. Please try again in a minute.',
      },
    },
  });
}
