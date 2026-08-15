import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@shared': fileURLToPath(new URL('./shared/src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    pool: 'forks',
    include: ['shared/src/**/*.test.ts', 'server/test/**/*.test.ts'],
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
});
