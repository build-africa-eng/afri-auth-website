import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

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
    noExternal: ['@auth/sveltekit', '@auth/core']
  },
  resolve: {
    alias: {
      '@auth/sveltekit/server': path.resolve('node_modules/@auth/sveltekit/dist/server.js')
    }
  }
});