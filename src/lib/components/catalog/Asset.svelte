<script lang="ts">
	import { Wallet } from 'phosphor-svelte';
	import GenericImage from '../GenericImage.svelte';
	import { onMount } from 'svelte';

	export let asset;
	let user = { username: 'Unknown' };

	onMount(async () => {
		const response = await fetch('/api/user/' + asset.creatorId);
		const body = await response.json();
		user = body;
	});
</script>

<a class="flex flex-col p-1 rounded-md transition-all hover:bg-overlay0" href="/catalog/{asset.id}">
	<GenericImage classes="rounded-md aspect-square" src={asset?.render?.id} />
	<p class="line-clamp-2 text-ellipsis">{asset.name}</p>
	<!-- {#if asset.creatorId !== 1} -->
	<p class="mt-auto text-sm text-subtext0">
		By <a href="/users/{asset.creatorId}/profile" class="font-bold text-accent">{user.username}</a>
	</p>
	<!-- {/if} -->
	{#if !asset.offsale}
		<p class="flex gap-1 text-subtext0">
			<Wallet class="my-auto" size="20" />
			{asset.price}
		</p>
	{/if}
</a>
