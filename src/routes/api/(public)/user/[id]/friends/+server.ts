import { error, json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

const MAX_RESULTS = 12;

export async function GET({ params, url, fetch }) {
	const id = Number(params.id);
	let page = Number(url.searchParams.get('page'));
	if (isNaN(id) || !isFinite(id)) error(404, 'Not Found');
	if (isNaN(page) || !isFinite(page)) page = 0;

	const user = await prisma.user.findFirst({
		where: { id },
		select: { username: true }
	});
	if (!user) error(404, 'Not Found');

	const friendships = await prisma.friendship.findMany({
		skip: page * MAX_RESULTS,
		take: MAX_RESULTS,
		where: {
			OR: [{ leftId: id }, { rightId: id }],
			status: 'FRIENDS'
		}
	});

	let friends = [];
	for (let { leftId, rightId } of friendships) {
		const peerId = leftId === id ? rightId : leftId;
		const response = await fetch('/api/user/' + peerId);
		const user = await response.json();

		friends.push(user);
	}

	return json({
		user: { id, username: user.username, friends: friendships.length },
		friends
	});
}
