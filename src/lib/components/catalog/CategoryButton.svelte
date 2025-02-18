<script lang="ts">
	import { CaretRight } from 'phosphor-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let selected, id;
</script>

<button
	class="flex place-content-between px-3 py-1.5 w-full transition-all group last:rounded-b-md hover:bg-overlay0"
	on:click={() => {
		dispatch('click', { id });
	}}
>
	<p class="text-left">
		<slot />
	</p>
	<CaretRight
		size="20"
		class="my-auto transition-all {selected === id ? 'rotate-90' : 'group-hover:rotate-45'}"
	/>
</button>
