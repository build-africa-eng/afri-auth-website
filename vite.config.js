import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    outDir: 'build'
  },
  server: {
    fs: {
      allow: ['.']
    }
  },
  ssr: {
    noExternal: ['@auth/sveltekit', '@auth/core'],
    external: []
  },
  optimizeDeps: {
    include: ['@auth/sveltekit/server']
  }
});