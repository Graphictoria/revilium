import prisma from '$lib/server/prisma';
import { randomBytes } from 'node:crypto';

export const load = async () => {
	const invites = await prisma.invite.findMany({
		orderBy: { created: 'desc' },
		select: {
			value: true,
			createdById: true,
			created: true,
			used: true,
			usedById: true
		}
	});

	return { invites };
};

export const actions = {
	default: async ({ request, locals }) => {
		const body = await request.formData();
		const invites = body.get('invites') || 1;

		let data = [];
		for (let _ = 0; _ < +invites; _++) {
			data.push({
				value: `revilium-${randomBytes(16).toString('hex')}`,
				createdById: locals.user.id
			});
		}

		await prisma.invite.createMany({ data });

		return { invites: data };
	}
};
