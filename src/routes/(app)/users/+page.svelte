<script>
	import PageMeta from '$lib/components/PageMeta.svelte';
	import Horizontal from '$lib/components/users/Horizontal.svelte';

	export let data;
</script>

<PageMeta title="Users" description="Browse users." />

<div class="p-3 mx-auto w-full rounded-md bg-secondary">
	<table class="w-full">
		<tr class="text-lg text-left border-b-2 border-surface0">
			<th class="p-1 w-20">Avatar</th>
			<th class="p-1 w-64">Username</th>
			<th class="p-1">Description</th>
			<th class="p-1 w-32">Last Online</th>
		</tr>
		{#await data.results then results}
			{#each results as user}
				<Horizontal {user} />
			{/each}
		{/await}
	</table>
</div>
