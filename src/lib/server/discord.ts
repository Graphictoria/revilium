import { env } from '$env/dynamic/private';
import { SITE_NAME } from '$lib/config';
import { updateDiscordTokens } from './prisma';
const BASE_URL = 'https://discord.com/api/v10';

interface AccessTokenResponse {
	access_token: string;
	token_type: 'Bearer';
	expires_in: number;
	expires_at: Date;
	refresh_token: string;
	scope: string;
}

export interface Tokens {
	access_token: string;
	refresh_token: string;
	expires_at: Date;
	scope: string;
	token_type?: string;
	expires_in?: number;
}

export interface OAuthMeResponse {
	application: unknown;
	scopes: string[];
	expires: string;
	user: {
		id: string;
		username: string;
		global_name: string;
		discriminator: string;
		avatar: string;
		verified: boolean;
		email?: string;
		flags: number;
		banner: string;
		accent_color: number;
		premium_type: number;
		public_flags: number;
	};
}

export function getOAuthUrl() {
	const state = crypto.randomUUID();
	const url = new URL(`${BASE_URL}/oauth2/authorize`);
	url.searchParams.set('client_id', env.DISCORD_CLIENT_ID);
	url.searchParams.set('redirect_uri', env.DISCORD_REDIRECT_URI);
	url.searchParams.set('response_type', 'code');
	url.searchParams.set('state', state);
	url.searchParams.set('scope', 'role_connections.write identify');
	url.searchParams.set('prompt', 'none');

	return { state, url };
}

export async function getOAuthTokens(code: string) {
	const body = new URLSearchParams();
	body.set('client_id', env.DISCORD_CLIENT_ID);
	body.set('client_secret', env.DISCORD_CLIENT_SECRET);
	body.set('grant_type', 'authorization_code');
	body.set('code', code);
	body.set('redirect_uri', env.DISCORD_REDIRECT_URI);

	const response = await fetch(`${BASE_URL}/oauth2/token`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	});

	if (!response.ok)
		throw new Error(`Error fetching OAuth tokens: [${response.status}] ${response.statusText}`);

	let data: AccessTokenResponse = await response.json();
	data.expires_at = new Date(Date.now() + data.expires_in * 1000);
	return data;
}

export async function getAccessToken(userId: string, tokens: Tokens) {
	if (Date.now() < tokens.expires_at.getTime()) return tokens.access_token;

	const body = new URLSearchParams();
	body.set('client_id', env.DISCORD_CLIENT_ID);
	body.set('client_secret', env.DISCORD_CLIENT_SECRET);
	body.set('grant_type', 'refresh_token');
	body.set('refresh_token', tokens.refresh_token);

	const response = await fetch(`${BASE_URL}/oauth2/token`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	});

	if (!response.ok)
		throw new Error(`Error refreshing access token: [${response.status}] ${response.statusText}`);

	const refreshed: AccessTokenResponse = await response.json();
	refreshed.expires_at = new Date(Date.now() + refreshed.expires_in * 1000);
	await updateDiscordTokens(userId, refreshed);

	return refreshed.access_token;
}

export async function getUserData(tokens: Tokens) {
	const response = await fetch(`${BASE_URL}/oauth2/@me`, {
		headers: { Authorization: `Bearer ${tokens.access_token}` }
	});

	if (!response.ok)
		throw new Error(`Error fetching user data: [${response.status}] ${response.statusText}`);

	const data: OAuthMeResponse = await response.json();
	return data;
}

export async function pushMetadata(userId: string, tokens: Tokens, metadata: any) {
	const accessToken = await getAccessToken(userId, tokens);
	const response = await fetch(
		`${BASE_URL}/users/@me/applications/${env.DISCORD_CLIENT_ID}/role-connection`,
		{
			method: 'PUT',
			body: JSON.stringify({ platform_name: SITE_NAME, metadata }),
			headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
		}
	);

	if (!response.ok)
		throw new Error(`Error pushing Discord metadata: [${response.status}] ${response.statusText}`);

	return await response.json();
}

export async function getMetadata(userId: string, tokens: Tokens, metadata: any) {
	const accessToken = await getAccessToken(userId, tokens);
	const response = await fetch(
		`${BASE_URL}/users/@me/applications/${env.DISCORD_CLIENT_ID}/role-connection`,
		{ headers: { Authorization: `Bearer ${accessToken}` } }
	);

	if (!response.ok)
		throw new Error(`Error getting Discord metadata: [${response.status}] ${response.statusText}`);

	return await response.json();
}
