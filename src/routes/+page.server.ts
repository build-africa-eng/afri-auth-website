import type { PageServerLoad } from './$types';
import { getSession } from '@auth/sveltekit/server';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await getSession(locals);
  return { session };
};
