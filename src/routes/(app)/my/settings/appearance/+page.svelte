<script>
	import PageMeta from '$lib/components/PageMeta.svelte';
	import Button from '$lib/components/Button.svelte';
	import SelectInput from '$lib/components/SelectInput.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	let theme = '',
		showSavedText = false;

	onMount(() => {
		theme = localStorage.getItem('theme') || 'dark';
	});

	onDestroy(() => {
		if (browser) {
			const theme = localStorage.getItem('theme') || 'dark';
			const html = document.getElementsByTagName('html')[0];

			html.setAttribute('data-theme', theme);
		}
	});

	function change() {
		const html = document.getElementsByTagName('html')[0];
		html.setAttribute('data-theme', theme);
	}

	function save() {
		localStorage.setItem('theme', theme);
		showSavedText = true;
		setTimeout(() => {
			showSavedText = false;
		}, 2500);
	}
</script>

<PageMeta title="Appearance Settings" />

<div class="flex flex-col gap-2 divide-y-2 divide-zinc-500/30">
	<p class="text-2xl font-bold">Appearance</p>
	<div class="pt-2 w-full">
		<div class="flex flex-col gap-1.5 max-w-xs">
			<p class="text-lg font-bold">Theme</p>
			<SelectInput name="theme" bind:value={theme} {change}>
				<option value="dark">Revilium Dark</option>
				<option value="latte">Catppuccin Latte</option>
				<option value="mocha">Catppuccin Mocha</option>
				<option value="amoled">AMOLED (By micro)</option>
			</SelectInput>
		</div>
		<div class="flex gap-3.5 mt-3">
			<div class="flex-grow max-w-xs">
				<Button style="primary" on:click={save}>Save Changes</Button>
			</div>
			{#if showSavedText}
				<p class="my-auto text-green-500">Saved.</p>
			{/if}
		</div>
	</div>
</div>
