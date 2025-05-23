import type { PageServerLoad } from './$types';
import { getSession } from '@auth/sveltekit/server';

export const load: PageServerLoad = async ({ locals, fetch }) => {
  const session = await getSession(locals);
  let users = [];
  if (session) {
    // Call Workers API
    const response = await fetch('https://afri-auth-website-workers.your-subdomain.workers.dev/api/users');
    users = await response.json();
  }
  return { session, users };
};
