import prisma from '$lib/server/prisma';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ params, locals }) => {
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

	if (!record) error(400, { message: 'No pending or active friendship.' });

	await prisma.friendship.deleteMany({
		where: {
			OR: [
				{ leftId: userId, rightId: locals.user.id },
				{ leftId: locals.user.id, rightId: userId }
			]
		}
	});

	if (record?.status === 'FRIENDS') {
		return json({ message: 'Removed friend.' });
	} else if (record?.status === 'PENDING' && record?.leftId === locals.user.id) {
		return json({ message: 'Cancelled friend request.' });
	} else {
		return json({ message: 'Denied friend request.' });
	}
};
