import { ROLE_MANAGERS } from '$lib/config';
import { getObject, getObjectMetadata } from '$lib/server/minio';
import prisma, { findAsset } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const GET = async ({ request, locals, url }) => {
	const id = Number(url.searchParams.get('id'));
	if (isNaN(id) || !isFinite(id)) return error(400, 'Invalid "id" in query');

	const record = await findAsset({ id });
	if (!record) return error(404, 'Not Found');
	if (record.status !== 'PUBLIC') {
		if (record.status === 'DELETED') return error(410, 'Gone');

		const user = await prisma.user.findFirst({
			where: { id: locals.user.id },
			select: { id: true, role: true }
		});
		if (!user) return error(401, 'Unauthorized');
		if (user.id !== record.creatorId && !ROLE_MANAGERS.includes(user.role))
			return error(403, 'Forbidden');
	}

	const object = await getObject(`assets/${record?.id}`);
	const metadata = await getObjectMetadata(`assets/${record?.id}`);

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
