import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  kit: {
    adapter: adapter({
      platform: {
        d1: 'DB' // Matches wrangler.toml binding
      }
    }),
    outDir: 'build' // Explicitly set output directory
  },
  preprocess: vitePreprocess()
};