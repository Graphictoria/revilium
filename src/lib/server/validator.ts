import z from 'zod';
import prisma, { findGroup } from './prisma';

export const username = z
	.string()
	.min(3, 'Username must be at least 3 characters.')
	.max(20, 'Username cannot be longer than 16 characters.')
	.regex(/^(?=^[^_]+_?[^_]+$).+$/g, 'Usernames can only have a single underscore.')
	.regex(/[a-z0-9_]/gi, 'Usernames must be alphanumeric.');

export const email = z.string().email('Invalid email address.');

export const password = z
	.string()
	.min(6, 'Password must be at least 6 characters.')
	.max(128, 'Password cannot be longer than 128 characters.');

export const inviteKey = z
	.string()
	.startsWith('revilium-', 'Invite doesnt start with "revilium-".')
	.length('revilium-'.length + 32, 'Invite is not long enough.');

export const twoFactor = z.string();

export const groupName = z
	.string()
	.min(3, 'Must be longer than 3 characters.')
	.max(50, 'Must be shorter than 50 characters.')
	.regex(/[ -~]/gi, 'Can only use ASCII characters.');

export const groupDescription = z.string().min(0).max(2000);

export const rccPingBody = z.object({
	// Who are you?
	uuid: z.string().uuid(),
	// What type of requests do you process?
	type: z.enum(['render', 'game']),
	// How many jobs are you processing?
	jobs: z.number(),
	// Where can I contact you?
	host: z.string(),
	// Whats the password?
	secret: z.string()
});

export const rccArtifactBody = z.object({
	assetId: z.number(),
	data: z.string()
});

export default {
	registerForm: z.object({
		username: username.refine(
			async (_) => !Boolean(await prisma.user.count({ where: { username: _ } })),
			'Username already in use.'
		),
		email: email.refine(
			async (_) => !Boolean(await prisma.user.count({ where: { email: _ } })),
			'Email already in use.'
		),
		password: password,
		inviteKey: inviteKey
	}).parseAsync,

	loginForm: z.object({
		username: username,
		password: password
	}).parseAsync,

	twoFactorForm: z.object({
		twofactor: twoFactor
	}).parse,

	createGroupForm: z.object({
		name: groupName.refine(
			async (_) => !Boolean(await findGroup({ name: _ })),
			'Group name is taken.'
		)
	})
};
