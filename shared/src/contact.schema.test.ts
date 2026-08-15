import { describe, expect, it } from 'vitest';
import { contactMessageSchema } from './contact';

describe('contactMessageSchema', () => {
  it('accepts a valid message and trims surrounding whitespace', () => {
    const result = contactMessageSchema.parse({
      name: '  Ada Lovelace  ',
      email: '  ada@example.com  ',
      message: '  Let\u2019s build something extraordinary.  ',
    });

    expect(result.name).toBe('Ada Lovelace');
    expect(result.email).toBe('ada@example.com');
    expect(result.message).toBe('Let\u2019s build something extraordinary.');
  });

  it.each([
    { field: 'name', value: '', reason: 'empty name' },
    { field: 'name', value: '   ', reason: 'whitespace-only name' },
    { field: 'name', value: 'x'.repeat(101), reason: 'name over 100 chars' },
    { field: 'email', value: 'not-an-email', reason: 'invalid email' },
    { field: 'email', value: '', reason: 'empty email' },
    { field: 'message', value: '', reason: 'empty message' },
    { field: 'message', value: 'x'.repeat(2001), reason: 'message over 2000 chars' },
  ])('rejects $reason', ({ field, value }) => {
    const base = {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello from the future.',
    };

    expect(() => contactMessageSchema.parse({ ...base, [field]: value })).toThrow();
  });

  it('rejects when a required field is missing', () => {
    const base = {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello from the future.',
    };

    for (const key of ['name', 'email', 'message'] as const) {
      const { [key]: _omitted, ...rest } = base;
      expect(() => contactMessageSchema.parse(rest)).toThrow();
    }
  });
});
