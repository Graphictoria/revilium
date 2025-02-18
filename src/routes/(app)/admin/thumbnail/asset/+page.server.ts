import { env } from '$env/dynamic/private';
import { ROLE_MANAGERS } from '$lib/config.js';
import minio from '$lib/server/minio.js';
import prisma from '$lib/server/prisma.js';
import { fail } from '@sveltejs/kit';
import { filetypemime } from 'magic-bytes.js';
import { randomBytes } from 'node:crypto';

export const actions = {
	default: async ({ request, locals }) => {
		const body = await request.formData();
		const id = Number(body.get('id')) as number;
		const file = body.get('file') as File;

		if (isNaN(id) || !isFinite(id)) return fail(400, { success: false, message: 'Invalid id' });
		if (!file) return fail(400, { success: false, message: 'Missing file' });

		const user = await prisma.user.findFirst({
			where: { id: locals.user.id },
			select: { role: true }
		});
		if (!user) return fail(401);
		if (!ROLE_MANAGERS.includes(user.role)) return fail(403);

		const buffer = Buffer.from(await file.arrayBuffer());
		const mimeType = filetypemime(buffer)[0];

		const asset = await prisma.asset.findFirst({ where: { id }, include: { render: true } });
		if (!asset) return fail(400, { success: false, message: 'Invalid id' });

		try {
			const object = await minio.putObject(
				env.MINIO_BUCKET,
				`renders/assets/${id}`,
				buffer,
				buffer.length,
				{ 'Content-Type': mimeType }
			);

			if (!asset.render) {
				await prisma.render.create({
					data: {
						id: randomBytes(16).toString('hex'),
						status: 'PUBLIC',
						assetId: asset.id
					}
				});
			}
		} catch (e) {
			return fail(500, { success: false, message: (e as Error).message });
		}

		return { success: true, message: 'Done' };
	}
};
