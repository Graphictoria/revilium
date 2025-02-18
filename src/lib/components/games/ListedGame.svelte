<script lang="ts">
	import { Users } from 'phosphor-svelte';
	import GenericImage from '../GenericImage.svelte';

	export let game;
</script>

<a
	href="/games/{game.id}"
	class="flex flex-col p-3 rounded-md transition-colors bg-secondary hover:bg-overlay0"
>
	<GenericImage classes="mb-1.5 rounded-md aspect-video" src={game.thumbnail?.id} />
	<p class="mb-1 font-bold leading-tight whitespace-break-spaces line-clamp-2">{game.name}</p>
	<div class="flex gap-1 mt-auto text-subtext0">
		<Users class="my-auto" size="19" />
		<p class="my-auto leading-tight">0 Players</p>
	</div>
</a>
