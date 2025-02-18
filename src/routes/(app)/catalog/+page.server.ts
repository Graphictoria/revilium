import prisma from '$lib/server/prisma';
import type { AssetType } from '@prisma/client';

const categoryMap: Record<string, Record<'type', AssetType>[]> = {
	all: [{ type: 'TSHIRT' }, { type: 'SHIRT' }, { type: 'PANTS' }, { type: 'GEAR' }],
	images: [{ type: 'IMAGE' }],
	tshirts: [{ type: 'TSHIRT' }],
	audios: [{ type: 'AUDIO' }],
	meshes: [{ type: 'MESH' }],
	// "LUA",
	// "HAT",
	// "PLACE",
	models: [{ type: 'MODEL' }],
	shirts: [{ type: 'SHIRT' }],
	pants: [{ type: 'PANTS' }],
	decals: [{ type: 'DECAL' }],
	// "HEAD",
	// "FACE",
	gear: [{ type: 'GEAR' }]
	// "BADGE",
	// "ANIMATION",
	// "TORSO",
	// "RIGHTARM",
	// "LEFTARM",
	// "LEFTLEG",
	// "RIGHTLEG",
	// "PACKAGE",
	// "GAMEPASS",
	// "PLUGIN",
	// "MESHPART"
};

export const load = async ({ url }) => {
	let category = url.searchParams.get('category');
	let page = url.searchParams.get('page') as string | number | undefined;
	page = Number(page);
	if (isNaN(page)) page = 0;
	if (!category || !Object.keys(categoryMap).includes(category)) category = 'all';

	const assets = await prisma.asset.findMany({
		where: {
			status: 'PUBLIC',
			offsale: false,
			OR: categoryMap[category as keyof typeof categoryMap]
		},
		include: { render: true },
		orderBy: { updated: 'desc' },
		take: 24,
		skip: 24 * page
	});

	const totalAssets = await prisma.asset.count({
		where: {
			status: 'PUBLIC',
			offsale: false,
			OR: categoryMap[category as keyof typeof categoryMap]
		}
	});

	return { assets, totalAssets };
};
