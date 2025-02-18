<script lang="ts">
	import { page } from '$app/stores';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { get } from 'svelte/store';

	const lazy = {
		universes: 'Universes',
		places: 'Places',
		models: 'Models',
		decals: 'Decals',
		gamepasses: 'Game Passes',
		audio: 'Audio',
		animations: 'Animations',
		meshes: 'Meshes',
		userads: 'User Ads',
		shirts: 'Shirts',
		tshirts: 'T-Shirts',
		pants: 'Pants'
	};

	function keys() {
		return Object.keys(lazy) as Array<keyof typeof lazy>;
	}

	let selected = get(page).url.pathname.replace('/develop/', '');

	page.subscribe((_) => {
		selected = _.url.pathname.replace('/develop/', '');
	});
</script>

<PageMeta title="Develop" />

<div class="flex gap-2">
	<div class="w-48 rounded-md min-w-lg">
		<div class="flex flex-col rounded-md bg-secondary">
			{#each keys() as lol}
				<a
					href={lol}
					class="{selected === lol
						? 'bg-zinc-100/10'
						: ''} px-3 py-2 first:rounded-t-md last:rounded-b-md transition-all hover:bg-zinc-100/10"
				>
					{lazy[lol]}
				</a>
			{/each}
		</div>
	</div>
	<div class="flex-grow">
		<div class="p-3 rounded-md bg-secondary">
			<slot />
		</div>
	</div>
</div>
