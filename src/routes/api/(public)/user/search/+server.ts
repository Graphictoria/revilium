import { usersIndex } from '$lib/server/meilisearch.js';
import { error, json } from '@sveltejs/kit';

export const GET = async ({ request, url }) => {
	const username = url.searchParams.get('username');
	const discord = url.searchParams.get('discord');

	if (!username && !discord) error(400, { message: 'Bad Request' });
	if (username) {
		const query = await usersIndex.search(username, { attributesToSearchOn: ['username'] });
		if (!query.hits.length) error(404, { message: 'Not Found' });

		return json(query.hits);
	} else if (discord) {
		const query = await usersIndex.search(discord, { attributesToSearchOn: ['discord'] });
		if (!query.hits.length) error(404, { message: 'Not Found' });

		return json(query.hits);
	}
};
