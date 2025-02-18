import { RCCMap } from '$lib/server/rcc.js';
import { rccPingBody } from '$lib/server/validator.js';
import { error } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const POST = async ({ request }) => {
	try {
		const body = rccPingBody.parse(await request.json());

		RCCMap.set(body.uuid, {
			lastSeen: Date.now(),
			type: body.type,
			jobs: body.jobs,
			host: body.host,
			secret: body.secret
		});

		return new Response('OK');
	} catch (e) {
		if (e instanceof ZodError) {
			throw error(400, {
				message: 'Validation Error',
				errors: e.errors.flatMap((_) => {
					return { key: _.path[0], message: _.message };
				})
			});
		} else {
			console.log(e);
			throw error(500, {
				message: 'Internal Server Error'
			});
		}
	}
};
