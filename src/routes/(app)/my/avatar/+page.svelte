<script lang="ts">
	import { user } from '$lib/client/stores';
	import Button from '$lib/components/Button.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import GenericImage from '$lib/components/GenericImage.svelte';
</script>

<PageMeta title="My Avatar" />

<div class="flex gap-2">
	<div class="w-[20%]">
		<div class="flex flex-col p-2 rounded-md bg-secondary">
			<GenericImage classes="w-full h-auto " src={$user?.render?.id} />
			<div class="flex flex-col gap-1 p-1">
				<div class="flex gap-1 place-content-center">
					<button class="w-7 h-8 bg-surface0" />
				</div>
				<div class="flex gap-1 place-content-center">
					<button class="w-7 h-16 bg-surface0" />
					<button class="w-16 h-16 bg-surface0" />
					<button class="w-7 h-16 bg-surface0" />
				</div>
				<div class="flex gap-1 place-content-center">
					<button class="w-7 h-16 bg-surface0" />
					<button class="w-7 h-16 bg-surface0" />
				</div>
			</div>

			<div class="pt-1 pb-0.5 text-sm text-center">
				<p class="text-subtext0">Does your avatar not look right?</p>
				<Button style="link">Redraw Avatar</Button>
			</div>
		</div>
	</div>
	<div class="flex-grow">
		<div class="flex flex-col rounded-md bg-secondary">
			<div>asset type select</div>
			<div>grid of items</div>
		</div>
	</div>
</div>
