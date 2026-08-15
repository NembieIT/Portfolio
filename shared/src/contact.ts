import { z } from 'zod';

export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters'),
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .max(254, 'Email must be at most 254 characters'),
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(2000, 'Message must be at most 2000 characters'),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;

export const contactMessageResponseSchema = z.object({
  data: z.object({
    id: z.string().min(1),
    createdAt: z.string().datetime(),
  }),
});

export type ContactMessageResponse = z.infer<typeof contactMessageResponseSchema>;

export const apiErrorSchema = z.object({
  error: z.object({
    code: z.string().min(1),
    message: z.string().min(1),
    details: z.array(z.unknown()).optional(),
  }),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
