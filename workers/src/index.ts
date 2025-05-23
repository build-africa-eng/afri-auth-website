import type { D1Database } from '@cloudflare/workers-types';
import { handleAuth } from './lib/auth';

export interface Env {
  DB: D1Database;
  GITHUB_ID: string;
  GITHUB_SECRET: string;
  AUTH_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/auth')) {
      // Handle Auth.js routes
      return await handleAuth(request, env);
    }
    if (url.pathname === '/api/users') {
      const db = env.DB;
      const { results } = await db.prepare('SELECT * FROM users').all();
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response('Afri Auth Workers API', { status: 200 });
  }
};