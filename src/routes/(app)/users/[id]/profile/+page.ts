import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
	const userResponse = await fetch('/api/user/' + params.id);
	const currentUser = await userResponse.json();

	if (userResponse.status !== 200) error(404, 'User Not Found');

	const friendshipResponse = await fetch(`/api/user/${params.id}/friend`);
	const friendship = await friendshipResponse.json();

	return { currentUser, friendship };
};
