<script>
	import { slide } from 'svelte/transition';
	import { List } from 'phosphor-svelte';

	let visible = false;

	function toggle() {
		visible = !visible;
	}
</script>

<svelte:body
	on:mousedown={() => {
		if (visible)
			setTimeout(() => {
				visible = false;
			}, 150);
	}}
/>

<div class="flex relative w-fit">
	<button
		class="my-auto w-min hover:bg-overlay0 transition-colors p-1 rounded-md {visible &&
			'bg-overlay0'}"
		on:click={toggle}
	>
		<List size="24" />
	</button>
	{#if visible}
		<div
			transition:slide
			class="w-[12rem] h-fit translate-y-[3.85rem] py-2 bg-secondary rounded-md origin-top right-0 absolute transition-all shadow-md"
		>
			<slot />
		</div>
	{/if}
</div>
