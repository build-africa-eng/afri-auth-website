import { Auth } from '@auth/core';
import type { D1Database } from '@cloudflare/workers-types';
import { D1Adapter } from '@auth/d1-adapter';
import GitHub from '@auth/core/providers/github';
import type { AuthConfig } from '@auth/core/types';

export const authConfig: AuthConfig = {
  adapter: D1Adapter({
    db: (globalThis as any).env.DB as D1Database
  }),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    }
  }
};

export async function handleAuth(request: Request, env: Env) {
  return await Auth(request, {
    ...authConfig,
    secret: process.env.AUTH_SECRET
  });
}
