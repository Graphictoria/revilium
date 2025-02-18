import { json, error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { ECONOMY_STIPEND } from '$lib/config.js';

/** @type {import('./$types.js').RequestHandler} */
export async function GET({ locals }) {
	const user = await prisma.user.findFirst({ where: { id: locals.user.id } });
	if (!user) error(500, { message: 'how the fuck did you do this' });

	let trackedCurrency = user.currency;
	let trackedStipend = user.stipend;

	await prisma.user.update({
		where: { id: user.id },
		data: { lastOnline: new Date() }
	});

	if (new Date() >= user.stipend) {
		const currentDate = new Date();
		let nextStipend = currentDate;
		nextStipend.setHours(currentDate.getHours() + 12);

		trackedCurrency += ECONOMY_STIPEND;
		trackedStipend = nextStipend;

		await prisma.user.update({
			where: { id: user.id },
			data: { stipend: trackedStipend, currency: trackedCurrency }
		});
	}

	const friendRequests = await prisma.friendship.count({
		where: {
			rightId: locals.user.id,
			status: 'PENDING'
		}
	});

	return json({
		friendRequests,
		currency: trackedCurrency,
		stipend: trackedStipend
	});
}
