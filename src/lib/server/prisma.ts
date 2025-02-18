import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { usersIndex } from './meilisearch';
import type { Tokens } from './discord';
const prisma = new PrismaClient();

async function formatFriends(user: any) {
	let friends: { friends: any[] } = { friends: [] };

	const query = await prisma.friendship.findMany({
		where: {
			OR: [{ leftId: user.id }, { rightId: user.id }],
			status: 'FRIENDS'
		}
	});

	for (let i = 0; query.length > i; i++) {
		let friendship = query[i];
		if (friendship.leftId === user.id) {
			const usr = await prisma.user.findFirst({ where: { id: friendship.rightId } });
			if (usr) friends.friends.push(usr);
		}
		if (friendship.rightId === user.id) {
			const usr = await prisma.user.findFirst({ where: { id: friendship.leftId } });
			if (usr) friends.friends.push(usr);
		}
	}

	return Object.assign(user, friends);
}

export default prisma;

interface FindAssetQuery {
	id?: number;
}

interface CreateUserData {
	username: string;
	email: string;
	password: string;
	inviteKey?: string;
}

export async function createUser(data: CreateUserData) {
	const user = await prisma.user.create({
		data: {
			username: data.username,
			email: data.email,
			password: await hash(data.password, 10),
			description: 'Hello there!'
		}
	});

	if (data.inviteKey)
		await prisma.invite.update({
			where: {
				value: data.inviteKey
			},
			data: {
				used: new Date(),
				usedById: user.id
			}
		});

	usersIndex.addDocuments([
		{
			id: user.id,
			username: user.username
		}
	]);

	return user;
}

export async function findFirstUnusedInvite(value: string) {
	return await prisma.invite.findFirst({
		where: {
			value,
			usedById: null
		}
	});
}

export async function findAsset(query: FindAssetQuery) {
	return await prisma.asset.findFirst({
		where: query,
		include: {
			render: true
		}
	});
}

export async function findUsers(query: { take: number; skip: number }) {
	return await prisma.user.findMany(query);
}

export async function findGroup(query: { id?: number; name?: string; ownerId?: number }) {
	return await prisma.group.findFirst({
		where: query
	});
}

export async function updateUser(query: { id?: number; username?: string }, data: any) {
	const result = await prisma.user.update({
		where: {
			id: query.id,
			username: query.username
		},
		data,
		include: { render: true, discord: true }
	});

	usersIndex.updateDocuments([
		{
			id: result.id,
			username: result.username,
			discord: result.discord?.id,
			render: result.render?.id
		}
	]);

	return result;
}

export async function updateDiscordTokens(userId: string, tokens: Tokens) {
	const result = await prisma.discord.update({
		where: { id: userId },
		data: {
			refreshToken: tokens.refresh_token,
			expiresAt: tokens.expires_at,
			accessToken: tokens.access_token,
			scope: tokens.scope
		}
	});

	return result;
}
