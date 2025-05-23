import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  kit: {
    adapter: adapter({
      // Optional: specify platform options for D1 database access
      platform: {
        d1: 'DB' // Matches binding in wrangler.toml
      }
    })
  },
  preprocess: vitePreprocess()
};