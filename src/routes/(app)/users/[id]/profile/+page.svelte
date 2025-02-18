<script lang="ts">
	import { user } from '$lib/client/stores';
	import { BADGES, ROLE_MAP } from '$lib/config';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import GenericImage from '$lib/components/GenericImage.svelte';
	import Button from '$lib/components/Button.svelte';
	import { invalidateAll } from '$app/navigation';
	import RoleColor from '$lib/components/RoleColor.svelte';
	import { isUserOnline } from '$lib/util.js';
	import Circle from '$lib/components/users/Circle.svelte';
    import Missing from "$lib/img/Missing.png"

	export let data;

	$: role = (data.currentUser?.role as keyof typeof ROLE_MAP) || 'USER';
	$: roleName = ROLE_MAP[role];

	async function request() {
		await fetch(`/api/user/${data.currentUser.id}/friend/request`, { method: 'POST' });
		invalidateAll();
	}

	async function cancel() {
		await fetch(`/api/user/${data.currentUser.id}/friend/cancel`, { method: 'POST' });
		invalidateAll();
	}
</script>

<PageMeta title={data.currentUser?.username} description={data.currentUser?.description} />

<div class="flex flex-col space-y-2">
	<div class="flex p-4 w-full rounded-md shadow-lg bg-secondary">
		<div class="relative w-32 h-32">
			<GenericImage classes={'w-32 h-32 rounded-full'} src={data.currentUser?.render?.id || 0} />
			<span
				class="absolute right-2 bottom-2 w-6 h-6 rounded-full shadow-lg origin-center outline outline-1 outline-surface0 {isUserOnline(
					new Date(data.currentUser.lastOnline)
				)
					? 'bg-status-online'
					: 'bg-status-offline'}"
			/>
		</div>
		<div class="flex flex-col place-content-between ml-4">
			<div>
				<div class="flex space-x-2 space-y-2.5">
					<p class="text-4xl font-bold">
						{data.currentUser.username}
					</p>
					<span class="mt-auto text-white/50">{data.currentUser.pronouns}</span>
				</div>
				<p class="text-lg">
					<RoleColor {role}>{roleName}</RoleColor>
				</p>
			</div>
			<div class="flex space-x-4">
				<p class="text-lg">
					<a href="/users/{data.currentUser.id}/friends" class="text-xl font-bold">
						{data.currentUser.friends}
					</a> Friends
				</p>
			</div>
		</div>
		{#if data.currentUser.id !== $user?.id}
			<div class="flex gap-2 mt-auto ml-auto">
				{#if data.friendship.friends}
					<Button style="danger" on:click={cancel}>Unfriend</Button>
				{:else if data.friendship.requested}
					<Button style="secondary" on:click={cancel}>Cancel</Button>
				{:else if data.friendship.pending}
					<Button style="primary" on:click={request}>Accept</Button>
					<Button style="danger" on:click={cancel}>Deny</Button>
				{:else}
					<Button style="primary" on:click={request}>Add Friend</Button>
				{/if}
			</div>
		{/if}
	</div>

	<div class="flex place-content-between space-x-2 w-full">
		<div class="w-[40rem] bg-secondary p-4 rounded-md divide-y-2 divide-white/20 shadow-lg">
			<p class="mb-2 text-2xl">Avatar</p>
			<div class="pt-2 w-full">
				<GenericImage classes={'w-96 h-96 mx-auto'} src={data.currentUser.render?.id || 0} />
			</div>
		</div>

		<div
			class="flex flex-col place-content-between p-4 w-full rounded-md divide-y-2 divide-white/20 bg-secondary"
		>
			<div class="w-full divide-y-2 divide-white/20">
				<p class="mb-2 text-2xl">About Me</p>
				<div class="overflow-auto pt-1 max-w-none h-[17.5rem] whitespace-pre-wrap">
					<p>{data.currentUser.description}</p>
				</div>
			</div>
			<div class="flex place-content-around pt-2 text-center">
				<div>
					<p>Date Joined</p>
					<p class="text-white/50">
						{new Date(data.currentUser.joinDate || 0).toLocaleDateString()}
					</p>
				</div>
				<div>
					<p>Last Online</p>
					<p class="text-white/50">
						{new Date(data.currentUser.lastOnline || 0).toLocaleDateString()}
					</p>
				</div>
				<div>
					<p>Place Visits</p>
					<p class="text-white/50">Infinity</p>
				</div>
			</div>
		</div>
	</div>

	<div class="flex gap-2">
		<div class="flex flex-col gap-2 w-full">
			<div class="p-4 rounded-md divide-y-2 shadow-lg bg-secondary divide-white/20">
				<p class="mb-2 text-2xl">Site Badges</p>
				<div class="grid grid-cols-5 gap-2 pt-2 w-full">
					{#each Object.keys(BADGES).slice(0, 10) as _}
						<a href="/badges#{_}">
							<img class="aspect-square" src={Missing} alt="" />
							<div class="px-0.5 mt-1">
								<p class="font-bold text-center overflow-clip whitespace-nowrap text-ellipsis">
									{_.replaceAll('_', ' ')}
								</p>
							</div>
						</a>
					{/each}
				</div>
			</div>
			<div class="p-4 rounded-md divide-y-2 shadow-lg bg-secondary divide-white/20">
				<p class="mb-2 text-2xl">Player Badges</p>
				<div class="grid grid-cols-5 grid-rows-2 gap-2 pt-2 w-full">
					{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as _}
						<a href="/groups/1">
							<img class="rounded-full aspect-square" src={Missing} alt="" />
							<div class="px-0.5 mt-1">
								<p class="font-bold text-center overflow-clip whitespace-nowrap text-ellipsis">
									Example Badge
								</p>
							</div>
						</a>
					{/each}
				</div>
			</div>
			<div class="p-4 rounded-md divide-y-2 shadow-lg bg-secondary divide-white/20">
				<p class="mb-2 text-2xl">Groups</p>
				<div class="grid grid-cols-4 grid-rows-2 gap-2 pt-2 w-full">
					{#each [0, 1, 2, 3, 4, 5, 6, 7] as _}
						<a href="/groups/1">
							<img class="rounded-lg aspect-square" src={Missing} alt="" />
							<div class="px-0.5 mt-1">
								<p
									class="font-bold overflow-clip whitespace-nowrap text-ellipsis group-hover:underline underline-offset-2"
								>
									Example Group
								</p>
								<p class="text-sm text-subtext0">999 Members</p>
								<p class="text-sm text-subtext0">bill clinton</p>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-2 w-full">
			<div class="p-4 rounded-md divide-y-2 shadow-lg bg-secondary divide-white/20">
				<p class="mb-2 text-2xl">Friends</p>
				<div class="grid grid-cols-5 gap-2 pt-2 w-full">
					{#each Object.keys(BADGES).slice(0, 10) as _}
						<Circle user={data.currentUser} />
					{/each}
				</div>
			</div>
			<div class="p-4 rounded-md divide-y-2 shadow-lg bg-secondary divide-white/20">
				<p class="mb-2 text-2xl">Favorites</p>
				<div class="grid grid-cols-4 gap-2 pt-2">
					{#each [0, 1, 2, 3, 4, 5, 6, 7] as _}
						<a href="/games/1">
							<img class="rounded-lg aspect-square" src={Missing} alt="" />
							<div class="px-0.5 mt-1">
								<p class="font-bold overflow-clip whitespace-nowrap text-ellipsis">Example Game</p>
								<p class="text-sm text-subtext0">
									By <a
										href="/users/1/profile"
										class="text-text hover:underline underline-offset-2"
									>
										{data.currentUser.username}
									</a>
								</p>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
