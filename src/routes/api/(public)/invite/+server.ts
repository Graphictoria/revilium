import { env } from '$env/dynamic/private';
import prisma from '$lib/server/prisma.js';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';
import { randomBytes } from 'node:crypto';

export const POST = async ({ request }) => {
	if (!request.headers.get('Authorization')) return error(401, { message: 'Bad Authorization' });
	if (request.headers.get('Authorization') !== env.DISCORD_BOT_SECRET)
		return error(401, { message: 'Bad Authorization' });

	try {
		const body = z
			.object({
				referrerId: z.number()
			})
			.parse(await request.json());

		const invite = await prisma.invite.create({
			data: {
				createdById: body.referrerId,
				value: `revilium-${randomBytes(16).toString('hex')}`
			}
		});

		return json(invite);
	} catch (e) {
		error(500, { message: 'Internal Server Error' });
	}
};
