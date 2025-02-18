<script lang="ts">
	import type { RenderStatus } from '@prisma/client';
	import GenericImage from '../GenericImage.svelte';
	import { dateToRelative, isUserOnline } from '$lib/util';
	import { ROLE_MAP } from '$lib/config';
	import RoleColor from '../RoleColor.svelte';

	export let user: {
		id: number;
		username: string;
		description: string | null;
		lastOnline: Date;
		role: keyof typeof ROLE_MAP;
		render: { id: string } | null;
	};

	let role = (user.role as keyof typeof ROLE_MAP) || 'USER';
</script>

<tr class="odd:bg-surface0">
	<td class="p-1">
		<a href="/users/{user.id}/profile">
			<GenericImage classes="h-16 w-16 rounded-full" src={user?.render?.id.toString()} />
		</a>
	</td>
	<td class="p-1">
		<div class="flex gap-2">
			<div
				class="my-auto w-4 h-4 rounded-full {isUserOnline(user.lastOnline)
					? 'bg-status-online'
					: 'bg-status-offline'}"
			/>
			<a
				class="my-auto text-lg font-bold transition-all hover:text-overlay0"
				href="/users/{user.id}/profile"
			>
				<RoleColor {role}>{user.username}</RoleColor>
			</a>
		</div>
	</td>
	<td class="p-1 align-top">
		<p class="whitespace-pre-line line-clamp-3">
			{user.description}
		</p>
	</td>
	<td class="p-1">{dateToRelative(user.lastOnline)}</td>
</tr>
