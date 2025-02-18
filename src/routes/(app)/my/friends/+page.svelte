<script>
	import { invalidateAll } from '$app/navigation';

	export let data;

	import Listed from '$lib/components/users/Listed.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';

	let tab = 0;
</script>

<div class="flex flex-col space-y-2">
	<div class="flex w-[30rem] rounded-md shadow-lg bg-secondary">
		<button
			class="w-full p-2 text-lg transition-all hover:bg-overlay0 rounded-l-md {tab == 0
				? 'text-subtext0 tracking-wider'
				: ''}"
			on:click={() => {
				tab = 0;
			}}
		>
			Friends
		</button>
		<button
			class="w-full p-2 text-lg transition-all hover:bg-overlay0 rounded-r-md {tab == 1
				? 'text-subtext0 tracking-wider'
				: ''}"
			on:click={() => {
				tab = 1;
			}}
		>
			Requests
		</button>
	</div>

	{#if tab == 0}
		<PageMeta title={'Friends'} description={'Your friends.'} />

		<div class="p-4 rounded-md divide-y-2 shadow-lg bg-secondary divide-overlay0">
			<p class="pb-2 text-2xl font-bold">Friends ({data?.friends?.length})</p>

			<div class="grid grid-cols-1 gap-2 pt-2 text-lg lg:grid-cols-2 xl:grid-cols-3">
				{#each data.friends as user}
					<Listed {user} canUnfriend={true} />
				{:else}
					<p class="col-span-3 mx-auto my-10 text-2xl text-subtext0">You don't have any friends.</p>
				{/each}
			</div>
		</div>
	{:else}
		<PageMeta title={'Friend Requests'} description={'Your friend requests.'} />

		<div class="p-4 rounded-md divide-y-2 shadow-lg bg-secondary divide-overlay0">
			<p class="pb-2 text-2xl font-bold">Requests ({data.pending.length})</p>

			<div class="grid grid-cols-1 gap-2 pt-2 text-lg lg:grid-cols-2 xl:grid-cols-3">
				{#each data.pending as user}
					<Listed {user} pending={true} />
				{:else}
					<p class="col-span-3 mx-auto my-10 text-2xl text-subtext0">
						You don't have any friend requests.
					</p>
				{/each}
			</div>
		</div>
	{/if}
</div>
