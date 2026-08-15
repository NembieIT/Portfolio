import { describe, expect, it } from 'vitest';
import { PROJECT_ACCENTS, projectDtoSchema, projectsResponseSchema } from './project';

describe('projectDtoSchema', () => {
  const valid = {
    id: 'abc123',
    title: 'E-Commerce Platform',
    category: 'Web App',
    description: 'Full CRUD storefront with JWT authentication.',
    tech: 'React • NodeJS • MongoDB',
    imageUrl: 'https://example.com/ecommerce.jpg',
    alt: 'Moody architectural visualization.',
    url: 'https://github.com/NembieIT',
    accent: 'primary',
  };

  it('accepts a valid project payload', () => {
    expect(projectDtoSchema.parse(valid)).toEqual(valid);
  });

  it('accepts optional Vietnamese fields', () => {
    const bilingual = {
      ...valid,
      titleVi: 'Nền tảng Thương mại điện tử',
      descriptionVi: 'Cửa hàng CRUD đầy đủ.',
    };

    expect(projectDtoSchema.parse(bilingual).titleVi).toBe('Nền tảng Thương mại điện tử');
  });

  it.each([
    { accent: 'invalid' as string, reason: 'unknown accent' },
    { url: '' as string, reason: 'empty url' },
    { imageUrl: 'not-a-url' as string, reason: 'invalid image URL' },
    { title: '' as string, reason: 'empty title' },
  ])('rejects $reason', ({ accent, url, imageUrl, title }) => {
    expect(() =>
      projectDtoSchema.parse({
        ...valid,
        accent: accent ?? valid.accent,
        url: url ?? valid.url,
        imageUrl: imageUrl ?? valid.imageUrl,
        title: title ?? valid.title,
      }),
    ).toThrow();
  });

  it('exposes only the supported accent tokens', () => {
    expect(PROJECT_ACCENTS).toEqual(['primary', 'secondary', 'inverse-primary']);
  });

  it('validates the full list response shape', () => {
    const response = {
      data: [
        { ...valid, id: 'one' },
        { ...valid, id: 'two', accent: 'secondary', titleVi: 'AI Nhận diện' },
      ],
      meta: { count: 2 },
    };

    expect(projectsResponseSchema.parse(response)).toEqual(response);
  });

  it('rejects a response with negative count', () => {
    expect(() => projectsResponseSchema.parse({ data: [], meta: { count: -1 } })).toThrow();
  });
});
