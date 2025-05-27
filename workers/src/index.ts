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

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    if (url.pathname.startsWith('/api/auth')) {
      return await handleAuth(request, env);
    }

    if (url.pathname === '/api/users') {
      // Check for session cookie (Auth.js stores session in D1)
      const sessionToken = request.headers.get('Authorization')?.replace('Bearer ', '');
      if (!sessionToken) {
        return new Response('Unauthorized', { status: 401 });
      }

      const db = env.DB;
      const session = await db
        .prepare('SELECT * FROM sessions WHERE sessionToken = ? AND expires > ?')
        .bind(sessionToken, new Date().toISOString())
        .first();
      if (!session) {
        return new Response('Unauthorized', { status: 401 });
      }

      const { results } = await db.prepare('SELECT id, email, name FROM users').all();
      const response = new Response(JSON.stringify(results), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      return response;
    }

    return new Response('Afri Auth Workers API', { status: 200 });
  },
};