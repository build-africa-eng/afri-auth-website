import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, platform }) => {
  const session = await locals.getSession();
  let users = [];

  if (session?.user) {
    // Query D1 database for users
    try {
      const result = await platform.env.DB.prepare('SELECT email FROM users').all();
      users = result.results;
    } catch (error) {
      console.error('Database query failed:', error);
    }
  } else {
    // Optional: Redirect unauthenticated users to login
    // throw redirect(302, '/login');
  }

  return {
    session,
    users
  };
};