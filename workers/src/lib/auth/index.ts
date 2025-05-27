import { Auth } from '@auth/core';
import type { D1Database } from '@cloudflare/workers-types';
import { D1Adapter } from '@auth/d1-adapter';
import GitHub from '@auth/core/providers/github';
import type { AuthConfig } from '@auth/core/types';

export function getAuthConfig(env: Env): AuthConfig {
  if (!env.DB) {
    throw new Error('D1 database binding "DB" is not defined');
  }
  return {
    adapter: D1Adapter(env.DB),
    providers: [
      GitHub({
        clientId: env.GITHUB_ID,
        clientSecret: env.GITHUB_SECRET,
      }),
    ],
    secret: env.AUTH_SECRET,
    trustHost: true,
    basePath: '/api/auth',
    callbacks: {
      async session({ session, user }) {
        session.user.id = user.id;
        return session;
      },
    },
  };
}

export async function handleAuth(request: Request, env: Env) {
  try {
    const response = await Auth(request, getAuthConfig(env));
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
    }
