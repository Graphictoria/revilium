<script lang="ts">
	import ListedGame from '$lib/components/games/ListedGame.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';

	export let data;
</script>

<PageMeta title="free games" />

<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
	{#each data.games as game}
		<ListedGame {game} />
	{/each}
</div>
