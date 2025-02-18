const URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
import { env } from '$env/dynamic/private';

export default async function (response:string, ip:string) {
	let formData = new FormData();
	formData.append('secret', env.TURNSTILE_SECRET);
	formData.append('response', response);
	formData.append('remoteip', ip);

	const verification = await fetch(URL, {
		method: 'POST',
		body: formData
	});

	return await verification.json();
}
