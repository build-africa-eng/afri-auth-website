import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, platform }) => {
  const session = await locals.getSession();
  let users = [];

  if (session?.user) {
    try {
      const result = await platform.env.DB.prepare('SELECT email FROM users').all();
      users = result.results;
    } catch (error) {
      console.error('Database query failed:', error);
    }
  }

  return {
    session,
    users
  };
};