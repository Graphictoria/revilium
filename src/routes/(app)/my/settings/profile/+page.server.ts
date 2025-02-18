import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import prisma from '$lib/server/prisma';
import { ECONOMY_USERNAME_CHANGE } from '$lib/config';

export const actions = {
	default: async ({ request, locals }) => {
		const user = await prisma.user.findFirst({
			where: { id: locals.user.id },
			select: { currency: true }
		});
		if (!user) return error(500, 'Internal Server Error');

		const data = await request.formData();
		const username = data.get('username') as string;
		const pronouns = data.get('pronouns') as string;
		const description = data.get('description') as string;

		let userData = {} as {
			username: string;
			pronouns: string;
			description: string;
			currency: number;
		};

		if (username.length) {
			if (user.currency - ECONOMY_USERNAME_CHANGE <= 0)
				return fail(400, {
					success: false,
					message: 'Insufficient funds.'
				});

			if (username.length < 2 || username.length > 16)
				return fail(400, {
					success: false,
					message: 'Username can only be 2-16 characters in length.'
				});

			if (!new RegExp(/^[a-z0-9_]+$/i).test(username))
				return fail(400, {
					success: false,
					message: 'Invalid username.'
				});

			if (await prisma.user.findFirst({ where: { username } }))
				return fail(400, {
					success: false,
					message: 'Username is taken.'
				});

			userData.username = username;
			userData.currency = user.currency - ECONOMY_USERNAME_CHANGE;
		}

		if (pronouns.length) {
			if (pronouns.length > 20)
				return fail(400, {
					success: false,
					message: 'Pronouns too long.'
				});

			userData.pronouns = pronouns;
		}

		if (description.length) {
			if (description.length > 700)
				return fail(400, {
					success: false,
					message: 'Description too long.'
				});

			userData.description = description;
		}

		const update = await prisma.user
			.update({
				where: {
					id: locals.user.id
				},
				data: userData
			})
			.catch((_) => {
				console.log(_);
				false;
			});

		if (!update)
			return fail(500, {
				success: false,
				message: 'Failed to update settings.'
			});

		return { success: true, data: userData };
	}
};
