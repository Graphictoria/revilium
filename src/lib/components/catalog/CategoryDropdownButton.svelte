<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let selected, id;
</script>

<button
	class="px-4 py-0.5 text-left transition-colors last:group-last:rounded-b-md text-subtext1 {selected ===
	id
		? 'bg-overlay0'
		: 'hover:bg-zinc-500/30'}"
	on:click={() => dispatch('click', {})}
>
	<slot />
</button>
