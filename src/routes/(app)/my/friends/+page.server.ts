import prisma from '$lib/server/prisma.js';

export async function load({ locals, fetch }) {
	const response = await fetch('/api/user/' + locals.user.id + '/friends');
	const { friends } = await response.json();

	const requests = await prisma.friendship.findMany({
		where: { rightId: locals.user.id, status: 'PENDING' },
		orderBy: { createdAt: 'asc' },
		select: {
			left: { select: { id: true, username: true, render: true, description: true } }
		}
	});

	const pending = requests.map((_) => _.left);

	return { friends, pending };
}
