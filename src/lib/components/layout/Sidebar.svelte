<script>
	import { user } from '$lib/client/stores';

	import GenericImage from '$lib/components/GenericImage.svelte';

	import {
		User,
		Pencil,
		Backpack,
		Users,
		UsersThree,
		Megaphone,
		DiscordLogo
	} from 'phosphor-svelte';
	import SidebarLink from './SidebarLink.svelte';
</script>

<div class="h-full translate-y-[4.2rem] w-44 bg-secondary">
	<div class="flex flex-col px-3 space-y-2.5 h-full text-lg">
		<div class="py-3 border-b-2 border-spacing-2 border-zinc-500/30">
			<a class="flex gap-2" href="/users/{$user?.id}/profile">
				{#if $user?.render}
					<GenericImage classes="w-8 h-8 rounded-full" src={$user?.render?.id || 0} />
				{:else}
					<GenericImage classes="w-8 h-8 rounded-full" src={$user?.render?.id || 0} />
				{/if}
				<p class="overflow-hidden my-auto">{$user?.username}</p>
			</a>
		</div>
		<SidebarLink href="/users/{$user?.id}/profile">
			<User size="25" />
			<p>Profile</p>
		</SidebarLink>
		<SidebarLink href="/my/avatar">
			<Pencil size="25" />
			<p>Avatar</p>
		</SidebarLink>
		<SidebarLink href="/users/{$user?.id}/inventory">
			<Backpack size="25" />
			<p>Inventory</p>
		</SidebarLink>
		<SidebarLink href="/users">
			<Users size="25" />
			<p>Users</p>
		</SidebarLink>
		<SidebarLink href="/groups">
			<UsersThree size="25" />
			<p>Groups</p>
		</SidebarLink>
		<SidebarLink href="/blog">
			<Megaphone size="25" />
			<p>Blog</p>
		</SidebarLink>
		<SidebarLink href="/api/discord">
			<DiscordLogo size="25" />
			<p>Discord</p>
		</SidebarLink>
	</div>
</div>
