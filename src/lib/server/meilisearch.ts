import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { MeiliSearch } from 'meilisearch';
import prisma from './prisma';

let meiliclient: MeiliSearch;
export function client() {
	if (building) return { index() {} } as unknown as MeiliSearch;

	if (!meiliclient)
		meiliclient = new MeiliSearch({
			host: env.MEILISEARCH_HOST,
			apiKey: env.MEILISEARCH_KEY
		});

	return meiliclient;
}

export const usersIndex = client().index('users');
// export const assetsIndex = client().index('assets');
// export const groups = client().index('groups');

if (!building) {
	client()
		.getIndex('users')
		.catch(async (_) => {
			client().createIndex('users');
			const users = await prisma.user.findMany({
				select: {
					id: true,
					username: true,
					render: true,
					discord: true
				}
			});

			usersIndex.addDocuments(
				users.map((_) => {
					return {
						id: _.id,
						username: _.username,
						discord: _?.discord,
						render: _.render?.id
					};
				})
			);
		});

	// These aren't used quite yet, so let's not actually index anything
	// right now and mess up the data.

	// client.getIndex('assets').catch((_) => {
	// 	client.createIndex('assets');
	// });

	// client.getIndex('groups').catch((_) => {
	// 	client.createIndex('groups');
	// });
}
