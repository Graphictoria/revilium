<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import GenericImage from '$lib/components/GenericImage.svelte';
	import HorizontalRule from '$lib/components/HorizontalRule.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { X } from 'phosphor-svelte';

	export let data;
	let dialog: HTMLDialogElement, selectedAsset: any, dialogImage: HTMLImageElement;
</script>

<PageMeta title="Asset Queue" />

<p class="text-lg font-bold">There are {data.pendingAssets.length} assets awaiting approval</p>

<div class="grid grid-cols-7 gap-2">
	{#each data.pendingAssets as asset}
		<div class="grid gap-1 p-2 rounded-md bg-secondary">
			<GenericImage classes="w-full" src={asset?.render?.id} />
			<div>
				<p class="font-bold">{asset.name}</p>
				<p class="text-subtext0">
					By <a class="text-accent hover:text-overlay0" href="/users/{asset?.creator?.id}/profile">
						{asset.creator?.username}
					</a>
				</p>
			</div>
			<Button
				style="secondary"
				on:click={() => {
					selectedAsset = asset;
					dialog.showModal();
				}}
			>
				Review
			</Button>
		</div>
	{/each}
</div>

<Modal bind:dialog>
	<div class="grid gap-1">
		<div class="flex mb-auto">
			<div>
				<p class="text-xl font-bold">{selectedAsset?.name}</p>
				<p class="text-subtext0">
					Uploaded by <a
						class="text-accent hover:text-overlay0"
						href="/users/{selectedAsset?.creator?.id}/profile"
					>
						{selectedAsset?.creator?.username}
					</a>
				</p>
			</div>
			<button
				class="ml-auto transition-colors hover:text-overlay0 text-text"
				on:click={() => {
					dialog.close();
				}}
			>
				<X size="28" />
			</button>
		</div>
		<HorizontalRule />
		<img
			class="w-[25rem] aspect-square"
			src="/api/thumbnail/{selectedAsset?.render?.id}"
			alt=""
			bind:this={dialogImage}
		/>
		<div class="flex gap-1">
			<Button style="secondary" on:click={() => (dialogImage.style['backgroundColor'] = 'white')}>
				White
			</Button>
			<Button style="secondary" on:click={() => (dialogImage.style['backgroundColor'] = 'black')}>
				Black
			</Button>
			<Button
				style="secondary"
				on:click={() => (dialogImage.style['backgroundColor'] = 'transparent')}
			>
				Transparent
			</Button>
		</div>
		<form class="flex gap-1" method="post">
			<input type="hidden" name="id" value={selectedAsset?.id} />
			<Button style="danger" formaction="?/moderate">Moderate User</Button>
			<Button style="secondary" formaction="?/deny">Deny</Button>
			<Button style="primary" formaction="?/accept">Accept</Button>
		</form>
	</div>
</Modal>
