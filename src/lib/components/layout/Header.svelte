<script>
	import { user } from '$lib/client/stores';
	import { SITE_NAME, ROLE_MANAGERS } from '$lib/config';
	import Dropdown from '../Dropdown.svelte';
	import DropdownButton from '../DropdownButton.svelte';
	import { UserPlus, Wallet } from 'phosphor-svelte';
	import HeaderLink from './HeaderLink.svelte';
	import { dateToRelative } from '$lib/util';
</script>

<div class="flex py-3 pr-3 w-full bg-secondary">
	<a class="flex mr-12 transition-all hover:text-overlay0" href="/">
		<img class="mr-1.5 ml-4 h-9" src="/img/ReviliumCatCropped.png" alt="" />
		<p class="my-auto text-2xl font-bold tracking-widest">{SITE_NAME}</p>
	</a>
	<div class="flex space-x-12 text-lg">
		<HeaderLink href="/">Home</HeaderLink>
		<HeaderLink href="/games">Games</HeaderLink>
		<HeaderLink href="/catalog">Catalog</HeaderLink>
		<HeaderLink href="/develop/universes">Develop</HeaderLink>
		{#if ROLE_MANAGERS.includes($user?.role || 'USER')}
			<HeaderLink href="/admin">Admin</HeaderLink>
		{/if}
		<HeaderLink href="/debug">Debug</HeaderLink>
	</div>
	<span class="flex-grow" />
	{#if $user?.id}
		<a
			href="/my/friends"
			class="flex px-2 space-x-2 rounded-md transition-colors bg-secondary hover:bg-overlay0"
		>
			<div class="my-auto">
				<UserPlus size="25" />
			</div>
			{#if $user?.friendRequests}
				<p class="my-auto text-lg">
					<span class="font-bold">{$user?.friendRequests}</span>
				</p>
			{/if}
		</a>
		<a
			href="/my/currency"
			class="flex px-2 space-x-2 rounded-md transition-colors bg-secondary hover:bg-overlay0"
			title="Next stipend {dateToRelative(new Date($user?.stipend || 0))}."
		>
			<!-- <img class="my-auto w-7 h-7" src="/img/Currency.png" alt="" /> -->
			<Wallet size="25" class="my-auto" />
			<p class="my-auto text-lg">
				<span class="font-bold">{$user.currency}</span>
			</p>
		</a>
		<div class="flex gap-2 px-2">
			<Dropdown>
				<DropdownButton href="/my/settings/profile">
					<p class="my-auto">Settings</p>
				</DropdownButton>
				<DropdownButton href="/logout">
					<p class="my-auto text-danger">Logout</p>
				</DropdownButton>
			</Dropdown>
		</div>
	{:else}
		<a class="px-3 py-1 rounded-md shadow-lg bg-accent" href="/landing">Login</a>
	{/if}
</div>
<div class="w-full h-1.5 bg-accent" />
