import { createUser, findFirstUnusedInvite } from '$lib/server/prisma.js';
import validator from '$lib/server/validator.js';
import { fail, isRedirect, redirect } from '@sveltejs/kit';
import turnstile from '$lib/server/turnstile';
import { ZodError } from 'zod';
import { createUserTokens } from '$lib/server/jwt';
import { JWT_ACCESS_NAME, JWT_REFRESH_NAME } from '$lib/config';

export const actions = {
	default: async ({ cookies, request }) => {
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

			if (body.get('password') !== body.get('cpassword'))
				return fail(400, {
					success: false,
					message: 'Validation Error',
					errors: [
						{ key: 'password', message: 'Passwords do not match.' },
						{ key: 'cpassword', message: 'Passwords do not match.' }
					]
				});

			const { username, email, password, inviteKey } = await validator.registerForm({
				username: body.get('username') as string,
				email: body.get('email') as string,
				password: body.get('password') as string,
				inviteKey: body.get('invite') as string
			});

			const invite = await findFirstUnusedInvite(inviteKey);
			if (!invite)
				return fail(400, {
					success: false,
					message: 'Validation Error',
					errors: [{ key: 'inviteKey', message: 'Invalid invite key.' }]
				});

			const user = await createUser({
				username,
				email,
				password,
				inviteKey
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
