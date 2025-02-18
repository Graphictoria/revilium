import { compare, hash } from 'bcrypt';
import { error, fail, redirect } from '@sveltejs/kit';
import prisma, { updateUser } from '$lib/server/prisma';
import { getOAuthTokens, getOAuthUrl, getUserData, pushMetadata } from '$lib/server/discord.js';

export async function load() {
	const { url, state } = getOAuthUrl();
	return {
		discordAuth: { url: url.toString(), state }
	};
}

export const actions = {
	save: async ({ request, locals }) => {
		const user = await prisma.user.findFirst({
			where: { id: locals.user.id },
			select: { password: true }
		});
		if (!user) return error(500, 'Internal Server Error');

		const body = await request.formData();
		const email = body.get('email') as string;
		const newpassword = body.get('newpassword') as string;
		const password = body.get('password') as string;
		const cpassword = body.get('cpassword') as string;

		if (email?.length) {
		}

		if (newpassword.length) {
			if (password !== cpassword)
				return fail(400, {
					success: false,
					message: 'Passwords do not match.'
				});

			if (!(await compare(password, user.password)))
				return fail(403, {
					success: false,
					message: 'Incorrect password.'
				});

			const update = await prisma.user
				.update({
					where: {
						id: locals.user.id
					},
					data: {
						password: await hash(newpassword, 10)
					}
				})
				.catch((_) => false);

			if (!update)
				return fail(500, {
					success: false,
					message: 'Failed to change password.'
				});
		}

		return { success: true };
	},
	link: async ({ request, locals }) => {
		const body = await request.formData();
		const code = body.get('code') as string;

		const tokens = await getOAuthTokens(code).catch((_) => null);
		if (!tokens)
			return fail(500, {
				success: false,
				message: 'Failed to fetch tokens.'
			});

		const userData = await getUserData(tokens).catch((_) => null);
		if (!userData)
			return fail(500, {
				success: false,
				message: 'Failed to fetch user data.'
			});

		await prisma.discord.create({
			data: {
				accessToken: tokens.access_token,
				expiresAt: tokens.expires_at,
				id: userData.user.id,
				refreshToken: tokens.refresh_token,
				scope: tokens.scope,
				userId: locals.user.id
			}
		});

		await pushMetadata(userData.user.id, tokens, { account: 1 });

		return redirect(302, '/my/settings/account');
	},
	unlink: async ({ locals }) => {
		const user = await prisma.user.findFirst({
			where: { id: locals.user.id },
			select: { discord: true }
		});
		if (!user) return error(500, 'Internal Server Error');
		if (!user.discord) return error(400, 'Bad Request');

		await pushMetadata(
			user.discord.id,
			{
				access_token: user.discord.accessToken,
				expires_at: user.discord.expiresAt,
				refresh_token: user.discord.refreshToken,
				scope: user.discord.scope
			},
			{ account: 0 }
		);

		await prisma.discord.delete({ where: { id: user.discord.id } });

		return redirect(302, '/my/settings/account');
	}
};
