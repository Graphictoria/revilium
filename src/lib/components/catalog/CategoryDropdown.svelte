<script lang="ts">
	import { slide } from 'svelte/transition';

	export let selected, id;
</script>

{#if selected === id}
	<div class="flex flex-col group" transition:slide>
		<slot />
	</div>
{/if}
