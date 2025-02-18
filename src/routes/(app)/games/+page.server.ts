import prisma from '$lib/server/prisma';

export const load = async () => {
	const games = await prisma.universe.findMany({
		orderBy: { updated: 'desc' },
		where: { visibility: 'PUBLIC' },
		include: {
			thumbnail: {
				select: {
					id: true,
					status: true
				}
			},
			user: {
				select: {
					id: true,
					username: true,
					render: {
						select: {
							id: true,
							status: true
						}
					}
				}
			},
			group: {
				select: {
					id: true,
					name: true,
					icon: {
						select: {
							id: true,
							status: true
						}
					}
				}
			}
		}
	});

	return { games };
};
