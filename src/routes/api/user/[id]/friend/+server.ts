import prisma from '$lib/server/prisma';
import { error, json } from '@sveltejs/kit';

export const GET = async ({ params, locals }) => {
	const userId = Number(params.id);
	if (isNaN(userId) || !isFinite(userId)) error(400, { message: 'Invalid "id"' });

	const record = await prisma.friendship.findFirst({
		where: {
			OR: [
				{ leftId: userId, rightId: locals.user.id },
				{ leftId: locals.user.id, rightId: userId }
			]
		}
	});

	return json({
		friends: record?.status === 'FRIENDS',
		requested: record?.status === 'PENDING' && record.leftId === locals.user.id,
		pending: record?.status === 'PENDING' && record.rightId === locals.user.id,
		since: record?.createdAt
	});
};
