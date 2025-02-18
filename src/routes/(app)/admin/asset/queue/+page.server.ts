import { env } from '$env/dynamic/private';
import { ROLE_MANAGERS } from '$lib/config.js';
import minio from '$lib/server/minio.js';
import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const pendingAssets = await prisma.asset.findMany({
		where: {
			status: 'REVIEW'
		},
		orderBy: {
			created: 'desc'
		},
		include: {
			group: true,
			render: true,
			creator: {
				select: {
					id: true,
					username: true,
					render: true
				}
			}
		}
	});

	return { pendingAssets };
};

export const actions = {
	deny: async ({ request, locals }) => {
		const body = await request.formData();
		const id = Number(body.get('id'));
		if (!id || isNaN(id)) return fail(400);

		const user = await prisma.user.findFirst({
			where: { id: locals.user.id },
			select: { role: true }
		});
		if (!user || !ROLE_MANAGERS.includes(user.role)) return fail(403);

		const asset = await prisma.asset.findFirst({ where: { id }, include: { render: true } });
		if (!asset) return fail(400);

		await prisma.asset.update({
			where: { id },
			data: {
				name: '[ Content Deleted ]',
				description: '[ Content Deleted ]',
				status: 'DELETED',
				offsale: true,
				updated: new Date()
			}
		});
		await minio.removeObject(env.MINIO_BUCKET, `assets/${asset.id}`);

		if (asset.render) {
			await prisma.render.update({ where: { id: asset.render.id }, data: { status: 'DELETED' } });
			await minio.removeObject(env.MINIO_BUCKET, `renders/assets/${asset.id}`);
		}

		return { success: true };
	},
	accept: async ({ request, locals }) => {
		const body = await request.formData();
		const id = Number(body.get('id'));
		if (!id || isNaN(id)) return fail(400);

		const user = await prisma.user.findFirst({
			where: { id: locals.user.id },
			select: { role: true }
		});
		if (!user || !ROLE_MANAGERS.includes(user.role)) return fail(403);

		const asset = await prisma.asset.findFirst({ where: { id }, include: { render: true } });
		if (!asset) return fail(400);

		await prisma.asset.update({
			where: { id },
			data: {
				status: 'PUBLIC',
				updated: new Date()
			}
		});

		if (asset.render)
			await prisma.render.update({ where: { id: asset.render.id }, data: { status: 'PUBLIC' } });

		return { success: true };
	}
};
