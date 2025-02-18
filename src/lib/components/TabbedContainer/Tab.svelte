<script lang="ts">
	import { get, type Writable } from 'svelte/store';

	export let tabName, store: Writable<any>;
</script>

<button
	class="py-2 w-full text-lg font-bold first:rounded-l-md last:rounded-r-md transition-all hover:bg-overlay0 {$store ===
	tabName
		? 'text-subtext0 tracking-wider'
		: ''}"
	on:click={() => {
		store.set(tabName);
	}}
>
	<slot />
</button>
