import { generateBackupCodes, generateSecret, generateURI, validateToken } from '$lib/server/otp';
import { compare } from 'bcrypt';
import { error, fail } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export async function load({ params, locals }) {
	const user = await prisma.user.findFirst({
		where: { id: locals.user.id },
		select: { otpSecret: true, username: true }
	});
	if (!user) return error(500, 'Internal Server Error');

	let secret;
	if (user?.otpSecret) secret = false;
	else secret = generateSecret();

	let uri = generateURI(user.username, secret);
	return { secret, uri };
}

export const actions = {
	authenticator: async ({ request, locals }) => {
		const user = await prisma.user.findFirst({
			where: { id: locals.user.id },
			select: { password: true }
		});
		if (!user) return error(500, 'Internal Server Error');

		const body = await request.formData();
		const token = body.get('token') as string;
		const password = body.get('password') as string;
		const secret = body.get('secret') as string;

		const isValid = validateToken(token, secret);
		if (!isValid)
			return fail(400, {
				success: false,
				type: 'authenticator',
				message: 'Incorrrect two-factor token.'
			});

		if (!(await compare(password, user.password)))
			return fail(403, {
				success: false,
				type: 'authenticator',
				message: 'Incorrect password.'
			});

		const update = await prisma.user
			.update({
				where: {
					id: locals.user.id
				},
				data: {
					otpSecret: secret,
					jwtVersion: {
						increment: 1
					}
				}
			})
			.catch((_) => false);
		if (!update)
			return fail(500, {
				success: false,
				type: 'authenticator',
				message: 'Failed to update 2FA status.'
			});

		return {
			success: true,
			message: 'Enabled.',
			type: 'authenticator'
		};
	}
};
