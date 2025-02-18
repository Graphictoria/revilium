<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import Missing from '$lib/img/Missing.png';
	let files: any, image: HTMLImageElement;

	export let form;

	function change() {
		const reader = new FileReader();
		if (!files[0]) return console.log('No file');

		reader.addEventListener('load', (e) => {
			if (!e.target || typeof e.target.result !== 'string') return;
			image.src = e.target.result;
		});

		reader.readAsDataURL(files[0]);
	}
</script>

<PageMeta title="Set Universe Thumbnail" />

<div class="grid gap-2">
	{#if form}
		{#if form.success}
			<tt class="p-2 max-w-sm text-green-500 rounded-md bg-secondary">{form.message}</tt>
		{:else}
			<tt class="p-2 max-w-sm text-red-500 rounded-md bg-secondary">{form.message}</tt>
		{/if}
	{/if}
	<form
		class="grid gap-2 p-2 max-w-sm rounded-md bg-secondary"
		method="post"
		enctype="multipart/form-data"
	>
		<input
			class="p-1 w-full rounded-md border-2 text-text bg-surface0 border-overlay0 placeholder:text-overlay0 peer"
			type="number"
			name="id"
			id="id"
			placeholder="Universe ID"
		/>
		<input
			class="rounded-md file:border-2 file:border-overlay0 file:bg-surface0 file:text-text file:rounded-md"
			type="file"
			name="file"
			id="file"
			max="1"
			bind:files
			on:change={change}
		/>
		<Button style="primary">Set Universe Thumbnail</Button>
	</form>
	<img
		class="max-w-sm rounded-md aspect-square"
		src={Missing}
		alt="Selected file"
		bind:this={image}
	/>
</div>
