import prisma from '$lib/server/prisma.js';
import validator from '$lib/server/validator.js';
import { fail, isRedirect, redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';
import { createUserTokens } from '$lib/server/jwt';
import { JWT_ACCESS_NAME, JWT_REFRESH_NAME } from '$lib/config';
import { validateToken } from '$lib/server/otp.js';

export const actions = {
	default: async ({ cookies, locals, request }) => {
		const body = await request.formData();

		try {
			const { twofactor } = validator.twoFactorForm({
				twofactor: body.get('twofactor') as string
			});

			const user = await prisma.user.findFirst({
				where: { id: locals.user.id },
				select: { id: true, otpSecret: true, jwtVersion: true }
			});
			if (!user || !user.otpSecret)
				return fail(500, {
					success: false,
					message: 'Internal Server Error',
					errors: [{ key: 'twofactor', message: 'Internal Server Error' }]
				});

			const isValid = validateToken(twofactor, user.otpSecret);
			if (!isValid)
				return fail(403, {
					success: false,
					message: 'Validation Error',
					errors: [{ key: 'twofactor', message: 'Invalid 2FA code.' }]
				});

			const tokens = createUserTokens(user, true);
			cookies.set(JWT_ACCESS_NAME, tokens.accessToken, { path: '/', sameSite: 'lax' });
			cookies.set(JWT_REFRESH_NAME, tokens.refreshToken, { path: '/', sameSite: 'lax' });

			return redirect(302, '/');
		} catch (e) {
			if (e instanceof ZodError) {
				return fail(400, {
					success: false,
					message: 'Validation Error',
					errors: e.errors.flatMap((_) => {
						return { key: _.path[0], message: _.message };
					})
				});
			}
			if (isRedirect(e)) {
				throw e;
			} else {
				console.log(e);
				return fail(500, {
					success: false,
					message: 'Internal Server Error',
					errors: []
				});
			}
		}
	}
};
