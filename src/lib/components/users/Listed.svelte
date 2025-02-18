<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import GenericImage from '$lib/components/GenericImage.svelte';
	import type { Render } from '@prisma/client';
	import Button from '../Button.svelte';

	export let pending = false,
		canUnfriend = false,
		user: {
			id: number;
			render: Render | null;
			description: string;
			username: string;
		};

	async function accept() {
		await fetch(`/api/user/${user.id}/friend/request`, { method: 'POST' });
		invalidateAll();
	}

	async function deny() {
		await fetch(`/api/user/${user.id}/friend/cancel`, { method: 'POST' });
		invalidateAll();
	}
</script>

<div class="flex flex-col gap-2.5 p-2 max-w-full rounded-md border-2 shadow-lg border-overlay0">
	<a class="flex gap-2" href="/users/{user.id}/profile">
		<GenericImage classes="h-24 rounded-full aspect-square" src={user?.render?.id} />
		<div class="flex flex-col">
			<p class="text-xl font-bold">{user.username}</p>
			<p class="text-sm text-subtext0 line-clamp-3 text-ellipsis">{user.description}</p>
		</div>
	</a>
	{#if pending}
		<div class="flex gap-2">
			<Button style="primary" on:click={accept}>Accept</Button>
			<Button style="secondary" on:click={deny}>Deny</Button>
		</div>
	{:else if canUnfriend}
		<div class="flex gap-2">
			<Button style="secondary" on:click={deny}>Unfriend</Button>
		</div>
	{/if}
</div>
