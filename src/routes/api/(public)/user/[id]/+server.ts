import { error, json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export async function GET({ params, locals }) {
	const id = Number(params.id);
	if (isNaN(id) || !isFinite(id)) error(404, 'Not Found');

	const user = await prisma.user.findFirst({
		where: { id },
		select: {
			id: true,
			username: true,
			email: id === locals?.user?.id,
			pronouns: true,
			role: true,
			joinDate: true,
			lastOnline: true,
			description: true,
			currency: true,
			render: { select: { id: true } },
			discord: { select: { id: true } }
		}
	});

	if (!user) error(404, 'Not Found');

	const friends = await prisma.friendship.count({
		where: {
			status: 'FRIENDS',
			OR: [{ rightId: user.id }, { leftId: user.id }]
		}
	});

	return json({
		...user,
		friends
	});
}
