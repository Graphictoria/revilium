import { JWT_ACCESS_NAME, JWT_REFRESH_NAME } from '$lib/config';
import { JWTMFAError, JWTValidationError, verifyUserTokens } from '$lib/server/jwt';
import { redirect } from '@sveltejs/kit';

const OPEN_ENDPOINTS = [
	'/(landing)/login',
	'/(landing)/register',
	'/(landing)/recover',
	'/(landing)/referred',
	'/legal/terms',
	'/legal/privacy',
	'/(app)/logout'
];

const OPEN_ENDPOINTS_PENDING_MFA = [
	'/(app)/logout',
	'/(landing)/twofactor',
	'/legal/terms',
	'/legal/privacy'
];

export const handle = async ({ event, resolve }) => {
	const { cookies, locals, request } = event;

	const refreshToken = cookies.get(JWT_REFRESH_NAME) as string;
	const accessToken = cookies.get(JWT_ACCESS_NAME) as string;

	try {
		const user = await verifyUserTokens({ refreshToken, accessToken });

		if (user.tokens) {
			const thirty_days = new Date();
			thirty_days.setDate(thirty_days.getDate() + 30);

			const fifteen_minutes = new Date();
			fifteen_minutes.setMinutes(fifteen_minutes.getMinutes() + 15);

			cookies.set(JWT_ACCESS_NAME, user.tokens.accessToken, {
				path: '/',
				sameSite: 'lax',
				expires: fifteen_minutes
			});
			cookies.set(JWT_REFRESH_NAME, user.tokens.refreshToken, {
				path: '/',
				sameSite: 'lax',
				expires: thirty_days
			});
		}

		locals.user = user;
	} catch (e) {
		if (e instanceof JWTValidationError) {
			cookies.delete(JWT_ACCESS_NAME, { path: '/' });
			cookies.delete(JWT_REFRESH_NAME, { path: '/' });

			if (
				event.route.id &&
				!OPEN_ENDPOINTS.includes(event.route.id) &&
				!event.route.id.startsWith('/api/(public)/')
			)
				return redirect(302, '/login');
		} else if (e instanceof JWTMFAError) {
			locals.user = {
				id: e.data.id
			};

			if (event.route.id && !OPEN_ENDPOINTS_PENDING_MFA.includes(event.route.id))
				return redirect(302, '/twofactor');
		} else {
			throw e;
		}
	}

	const now = new Date();
	const time = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
	console.log(
		`[${now.getMonth() + 1}/${now.getDate()} ${time}] ${event.getClientAddress()} - ${request.method} ${event.url.pathname}`
	);

	return await resolve(event);
};

// Suppress 404 errors
export async function handleError({ error, status, message }) {
	if (status !== 404) console.log(error);

	return { status, message };
}
