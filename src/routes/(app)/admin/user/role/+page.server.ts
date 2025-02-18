import prisma from '$lib/server/prisma';
import type { Role } from '@prisma/client';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals }) => {
		const body = await request.formData();
		const id = Number(body.get('id'));
		const role = body.get('role') as Role;
		if (isNaN(id) || !isFinite(id)) return fail(400);
		if (locals.user.id !== 1) return fail(403);

		await prisma.user.update({ where: { id }, data: { role } });

		return { success: true };
	}
};
