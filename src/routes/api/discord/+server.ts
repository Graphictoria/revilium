import { DISCORD_SERVER_ID } from '$lib/config';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, cookies }) {
	const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`);
	const body = await response.json();

	redirect(302, body.instant_invite);
}
