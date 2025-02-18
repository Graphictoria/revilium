import type { PageServerLoad } from './$types.js';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, url, fetch }) => {
	const id = Number(params.id);
	if (isNaN(id) || !isFinite(id)) return error(404, 'User Not Found');

	const response = await fetch(
		'/api/user/' + id + '/friends?page=' + url.searchParams.get('page') || '0'
	);
	if (!response.ok) return error(404, 'User Not Found');
	const { user, friends } = await response.json();

	return { selectedUser: user, friends };
};
