import { fail } from '@sveltejs/kit';
import turnstile from '$lib/server/turnstile';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const body = await request.formData();
		const turnstile_response = body.get('cf-turnstile-response') as string;

		if (!turnstile_response)
			return fail(400, {
				success: false,
				message: 'Missing Turnstile'
			});

		const verification = await turnstile(turnstile_response, '127.0.0.1');
		if (!verification.success)
			return fail(403, {
				success: false,
				message: 'Failed Turnstile'
			});

		return {
			success: true,
			message: 'Passed Turnstile'
		};
	}
};
