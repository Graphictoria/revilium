import { redirect } from '@sveltejs/kit';
import { JWT_ACCESS_NAME, JWT_REFRESH_NAME } from '$lib/config';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, cookies }) {
	cookies.delete(JWT_REFRESH_NAME, { path: '/' });
	cookies.delete(JWT_ACCESS_NAME, { path: '/' });

	redirect(302, '/login');
}
