<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let style: 'primary' | 'secondary' | 'danger' | 'link',
		disabled = false,
		formaction = undefined;
</script>

{#if style === 'primary'}
	<button
		class="px-2 py-1.5 w-full font-bold rounded-md shadow-lg text-text bg-accent"
		{disabled}
		{formaction}
		on:click={() => {
			dispatch('click', {});
		}}
	>
		<slot />
	</button>
{:else if style === 'secondary'}
	<button
		class="px-2 py-1.5 w-full font-bold rounded-md shadow-lg text-text bg-surface0"
		{disabled}
		{formaction}
		on:click={() => {
			dispatch('click', {});
		}}
	>
		<slot />
	</button>
{:else if style === 'danger'}
	<button
		class="px-2 py-1.5 w-full font-bold text-white rounded-md shadow-lg bg-danger"
		{disabled}
		{formaction}
		on:click={() => {
			dispatch('click', {});
		}}
	>
		<slot />
	</button>
{:else if style === 'link'}
	<button
		class="text-accent"
		{disabled}
		{formaction}
		on:click={() => {
			dispatch('click', {});
		}}
	>
		<slot />
	</button>
{/if}
