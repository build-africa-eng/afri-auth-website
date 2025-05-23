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
    adapter: D1Adapter({ db: env.DB }),
    providers: [
      GitHub({
        clientId: env.GITHUB_ID,
        clientSecret: env.GITHUB_SECRET
      })
    ],
    callbacks: {
      async session({ session, user }) {
        session.user.id = user.id;
        return session;
      }
    }
  };
}

export async function handleAuth(request: Request, env: Env) {
  try {
    return await Auth(request, {
      ...getAuthConfig(env),
      secret: env.AUTH_SECRET
    });
  } catch (error) {
    console.error('Auth error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}