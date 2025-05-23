import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { D1Adapter } from '@auth/d1-adapter';

export const handle = SvelteKitAuth(async (event) => {
  return {
    providers: [
      GitHub({
        clientId: event.platform.env.GITHUB_ID,
        clientSecret: event.platform.env.GITHUB_SECRET
      })
    ],
    adapter: D1Adapter({
      getDB: () => event.platform.env.DB
    }),
    secret: event.platform.env.AUTH_SECRET,
    trustHost: true
  };
});