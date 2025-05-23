import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    outDir: 'build', // Ensure output directory matches wrangler.toml
  },
  server: {
    fs: {
      allow: ['.'] // Allow access to project root
    }
  }
});