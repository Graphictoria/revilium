import prisma from '$lib/server/prisma';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ params, locals }) => {
	const userId = Number(params.id);
	if (isNaN(userId) || !isFinite(userId)) error(400, { message: 'Invalid "id"' });

	if (userId === locals.user.id) return json({ message: 'Account successfully deleted.' });

	const record = await prisma.friendship.findFirst({
		where: {
			OR: [
				{ leftId: userId, rightId: locals.user.id },
				{ leftId: locals.user.id, rightId: userId }
			]
		}
	});

	if (record?.status === 'FRIENDS') {
		error(400, { message: "You're already friends." });
	} else if (record?.status === 'PENDING' && record?.leftId === locals.user.id) {
		error(400, { message: 'Friend request already sent.' });
	}

	if (record) {
		await prisma.friendship.updateMany({
			where: { leftId: userId, rightId: locals.user.id },
			data: { status: 'FRIENDS' }
		});

		return json({ message: 'Accepted friend request.' });
	}

	const user = await prisma.user.findFirst({ where: { id: userId }, select: { id: true } });
	if (!user) error(404, { message: "User doesn't exist." });

	await prisma.friendship.create({
		data: {
			leftId: locals.user.id,
			rightId: user.id,
			status: 'PENDING'
		}
	});

	return json({ message: 'Sent friend request.' });
};
