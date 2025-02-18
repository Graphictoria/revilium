<script>
	import Button from '$lib/components/Button.svelte';
	import HorizontalRule from '$lib/components/HorizontalRule.svelte';
	import GenericImage from '$lib/components/GenericImage.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';

	export let data;
</script>

<PageMeta title={data.asset.name} />

<div class="flex gap-3 p-4 mx-auto w-[60rem] rounded-md bg-secondary">
	<GenericImage src={data.asset?.render?.id} classes="w-96 h-96 flex-shrink-0" />
	<div class="flex flex-col gap-1.5 w-[33.75rem]">
		<div>
			<h1 class="text-4xl font-bold">{data.asset?.name}</h1>
			<p>
				By <a
					class="font-bold transition-all hover:text-overlay0"
					href="/users/{data.creator?.id}/profile"
				>
					{data.creator?.username}
				</a>
			</p>
		</div>
		<HorizontalRule />
		<div class="w-full attributes">
			<div class="attr-group">
				<p class="w-min font-bold text-subtext0">Price</p>
				{#if data.asset?.offsale}
					<p>Offsale</p>
				{:else}
					<p>{data.asset?.price}</p>
				{/if}
			</div>
			<div class="attr-group">
				<p class="w-min font-bold text-subtext0">Type</p>
				<p>{data.asset?.type}</p>
			</div>
			<div class="w-full attr-group">
				<p class="w-min font-bold text-subtext0">Description</p>
				<p class="overflow-hidden whitespace-pre-line text-wrap">
					{data.asset?.description}
				</p>
			</div>
		</div>
		{#if !data.asset?.offsale}
			<div class="flex mt-auto h-11 text-lg">
				<Button style="primary">Purchase</Button>
			</div>
		{/if}
	</div>
</div>

<style>
	.attributes {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.15rem;
	}

	.attr-group {
		display: grid;
		grid-column: 1/ -1;
		grid-template-columns: subgrid;
		gap: 1.5rem;
	}
</style>
