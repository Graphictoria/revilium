import { findAsset } from '$lib/server/prisma.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params, locals, fetch }) => {
	const asset = await findAsset({ id: Number(params.id) });
	if (!asset) error(404, { message: 'Not Found' });

	const response = await fetch('/api/user/' + asset.creatorId);
	const creator = await response.json();

	return { asset, creator };
};
