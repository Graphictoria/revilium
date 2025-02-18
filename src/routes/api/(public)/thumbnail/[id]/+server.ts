import { ROLE_MANAGERS } from '$lib/config.js';
import { getObject, getObjectMetadata } from '$lib/server/minio';
import prisma from '$lib/server/prisma.js';
import { error } from '@sveltejs/kit';
import type { BucketItemStat } from 'minio';
import type { Readable } from 'node:stream';

export const GET = async ({ params, locals }) => {
	const id = params.id;
	if (!id) error(400, 'Bad Request');

	const record = await prisma.render.findFirst({
		where: { id },
		include: { asset: true, user: true, universe: true, group: true }
	});
	if (!record) error(404);

	if (record.status !== 'PUBLIC') {
		if (record.status === 'DELETED') return error(410, 'Gone');

		const user = await prisma.user.findFirst({ where: { id: locals.user.id } });
		if (!user) return error(401, 'Unauthorized');
		if (!ROLE_MANAGERS.includes(user.role)) return error(403, 'Forbidden');
	}

	if (record.asset?.status !== 'PUBLIC') {
		if (record.asset?.status === 'DELETED') return error(410, 'Gone');

		const user = await prisma.user.findFirst({ where: { id: locals.user.id } });
		if (!user) return error(401, 'Unauthorized');
		if (!ROLE_MANAGERS.includes(user.role)) return error(403, 'Forbidden');
	}

	let object: Readable;
	let metadata: BucketItemStat;

	if (record.userId) {
		object = await getObject(`renders/users/${record.userId}`);
		metadata = await getObjectMetadata(`renders/users/${record.userId}`);
	} else if (record.assetId) {
		object = await getObject(`renders/assets/${record.assetId}`);
		metadata = await getObjectMetadata(`renders/assets/${record.assetId}`);
	} else if (record.universeId) {
		object = await getObject(`renders/universes/${record.universeId}`);
		metadata = await getObjectMetadata(`renders/universes/${record.universeId}`);
	} else if (record.groupId) {
		object = await getObject(`renders/groups/${record.groupId}`);
		metadata = await getObjectMetadata(`renders/groups/${record.groupId}`);
	} else {
		console.log(record);
		error(500, { message: 'Render not associated' });
	}

	const ac = new AbortController();
	ac.signal.onabort = () => object.destroy();

	const stream = new ReadableStream({
		start(controller) {
			object.on('data', (chunk) => {
				controller.enqueue(chunk);
			});
			object.on('end', () => {
				controller.close();
			});
		},
		cancel() {
			ac.abort();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': metadata.metaData['content-type'],
			'Content-Length': metadata.size.toString()
		}
	});
};
