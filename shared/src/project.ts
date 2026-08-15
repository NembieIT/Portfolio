import { z } from 'zod';

export const PROJECT_ACCENTS = ['primary', 'secondary', 'inverse-primary'] as const;

export const projectDtoSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  titleVi: z.string().min(1).optional(),
  category: z.string().min(1),
  description: z.string().min(1),
  descriptionVi: z.string().min(1).optional(),
  tech: z.string().min(1),
  imageUrl: z.string().url(),
  alt: z.string().min(1),
  url: z.string().min(1),
  accent: z.enum(PROJECT_ACCENTS),
});

export type ProjectDto = z.infer<typeof projectDtoSchema>;

export const projectsResponseSchema = z.object({
  data: z.array(projectDtoSchema),
  meta: z.object({
    count: z.number().int().nonnegative(),
  }),
});

export type ProjectsResponse = z.infer<typeof projectsResponseSchema>;
