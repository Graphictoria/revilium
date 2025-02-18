import prisma from '$lib/server/prisma.js';
import validator from '$lib/server/validator.js';
import { fail, isRedirect, redirect } from '@sveltejs/kit';
import turnstile from '$lib/server/turnstile';
import { compare } from 'bcrypt';
import { ZodError } from 'zod';
import { createUserTokens } from '$lib/server/jwt';
import { JWT_ACCESS_NAME, JWT_REFRESH_NAME } from '$lib/config';

export const actions = {
	default: async ({ cookies, locals, request }) => {
		const body = await request.formData();
		const turnstileResponse = body.get('cf-turnstile-response') as string;
		const remoteAddress = request.headers.get('x-forwarded-for') || '127.0.0.1'; // might be incorrect

		try {
			const verification = await turnstile(turnstileResponse, remoteAddress);
			if (!verification.success) {
				return fail(403, {
					success: false,
					message: 'Validation Error',
					errors: [{ key: 'turnstile', message: 'Turnstile verification failed.' }]
				});
			}

			const { username, password } = await validator.loginForm({
				username: body.get('username') as string,
				password: body.get('password') as string
			});

			const user = await prisma.user.findFirst({
				where: { username },
				select: { id: true, password: true, otpSecret: true, jwtVersion: true }
			});
			if (!user)
				return fail(400, {
					success: false,
					message: 'Validation Error',
					errors: [{ key: 'username', message: 'Account does not exist.' }]
				});

			if (!(await compare(password, user.password)))
				return fail(403, {
					success: false,
					message: 'Validation Error',
					errors: [{ key: 'password', message: 'Incorrect password.' }]
				});

			const thirty_days = new Date();
			thirty_days.setDate(thirty_days.getDate() + 30);

			const fifteen_minutes = new Date();
			fifteen_minutes.setMinutes(fifteen_minutes.getMinutes() + 15);

			const tokens = createUserTokens(user);
			cookies.set(JWT_ACCESS_NAME, tokens.accessToken, {
				path: '/',
				sameSite: 'lax',
				expires: fifteen_minutes
			});
			cookies.set(JWT_REFRESH_NAME, tokens.refreshToken, {
				path: '/',
				sameSite: 'lax',
				expires: thirty_days
			});

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
