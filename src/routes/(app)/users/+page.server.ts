import prisma from '$lib/server/prisma.js';
import { error } from '@sveltejs/kit';

const PER_PAGE = 8;

export const load = async ({ url }) => {
	let page = Number(url.searchParams.get('page'));
	if (isNaN(page)) page = 0;

	const totalUsers = await prisma.user.count();
	const pages = Math.ceil(totalUsers / PER_PAGE);
	if ((page || 0) >= Math.ceil(totalUsers / PER_PAGE)) error(400, { message: 'Invalid page' });

	const results = prisma.user.findMany({
		skip: +(url.searchParams.get('i') || 0) * PER_PAGE,
		take: PER_PAGE,
		orderBy: { lastOnline: 'desc' },
		select: {
			id: true,
			username: true,
			description: true,
			lastOnline: true,
			render: { select: { id: true } },
			role: true
		}
	});

	return { results, pages };
};
