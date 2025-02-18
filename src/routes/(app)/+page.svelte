<script>
	import { user } from '$lib/client/stores';

	import PageMeta from '$lib/components/PageMeta.svelte';
	import GenericImage from '$lib/components/GenericImage.svelte';
	import Circle from '$lib/components/users/Circle.svelte';

	export let data;
</script>

<PageMeta title="Home" description="fak u" />

<div class="flex flex-col space-y-6">
	<div class="flex space-x-4">
		{#if $user?.render}
			<GenericImage
				classes={'w-40 h-40 bg-secondary shadow-lg rounded-full'}
				src={$user?.render?.id.toString() || '0'}
			/>
		{:else}
			<GenericImage classes={'w-40 h-40 bg-secondary shadow-lg rounded-full'} src={'0'} />
		{/if}
		<p class="my-auto text-3xl">Hello, <span class="font-bold">{$user?.username}</span>!</p>
	</div>

	<div class="flex flex-col space-y-2">
		<div class="flex place-content-between">
			<p class="text-2xl">Friends ({data.friends.length})</p>
			<a class="px-2 py-1 my-auto rounded-md shadow-lg bg-accent" href="/my/friends">See All</a>
		</div>
		<div class="flex p-2.5 space-x-2 w-full h-40 rounded-md bg-secondary">
			{#each data.friends as _, i}
				<Circle id={_.id} username={_.username} render={_?.render} {i} />
			{:else}
				<p class="m-auto text-2xl text-white/50">You don't have any friends.</p>
			{/each}
		</div>
	</div>
</div>
