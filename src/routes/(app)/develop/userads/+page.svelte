<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import HorizontalRule from '$lib/components/HorizontalRule.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { ECONOMY_AD_CREATE, ECONOMY_CURRENCY_NAME } from '$lib/config';
</script>

<div class="flex flex-col">
	<p class="mb-1 text-2xl font-bold">User Ads</p>
	<HorizontalRule />

	<form class="mt-2 w-[50%] form" method="post">
		<div class="form-group">
			<p class="my-auto whitespace-nowrap text-subtext0">Image Upload</p>
			<input
				class="rounded-md file:border-2 file:border-overlay0 file:bg-surface0 file:text-text file:rounded-md"
				type="file"
				name="file"
				id="file"
			/>
		</div>
		<div class="form-group">
			<p class="my-auto whitespace-nowrap text-subtext0">Name</p>
			<TextInput type="text" name="name" placeholder="Google" />
		</div>
		<div class="form-group">
			<p class="my-auto whitespace-nowrap text-subtext0">Location</p>
			<TextInput type="text" name="location" placeholder="https://google.com/" />
		</div>
		<div class="col-span-2">
			<Button style="primary">{ECONOMY_AD_CREATE} {ECONOMY_CURRENCY_NAME}</Button>
		</div>
	</form>

	<span class="flex my-2"><HorizontalRule /></span>

	<div class="grid grid-cols-2 gap-2">
		<div class="flex gap-3 p-3 rounded-md border-2 border-overlay0">
			<img class="object-contain w-28 h-28" src="/img/AdBannerTemplate.png" alt="" />
			<div class="flex flex-col my-auto">
				<p class="text-lg font-bold">Google</p>
				<a class="text-accent" href="https://google.com">google.com</a>
				<p class="text-green-500">Active</p>
			</div>
			<div class="flex flex-col gap-2 my-auto ml-auto w-32">
				<Button style="secondary">Deactivate</Button>
				<Button style="danger">Delete</Button>
			</div>
		</div>
		<div class="flex gap-3 p-3 rounded-md border-2 border-overlay0">
			<img class="object-contain w-28 h-28" src="/img/AdSkyscraperTemplate.png" alt="" />
			<div class="flex flex-col my-auto">
				<p class="text-lg font-bold">DuckDuckGo</p>
				<a class="text-accent" href="https://duckduckgo.com">duckduckgo.com</a>
				<p class="text-subtext0">Pending</p>
			</div>
			<div class="flex flex-col gap-2 my-auto ml-auto w-32">
				<Button style="secondary">Deactivate</Button>
				<Button style="danger">Delete</Button>
			</div>
		</div>
		<div class="flex gap-3 p-3 rounded-md border-2 border-overlay0">
			<img class="object-contain w-28 h-28" src="/img/AdRectangleTemplate.png" alt="" />
			<div class="flex flex-col my-auto">
				<p class="text-lg font-bold">Bing</p>
				<a class="text-accent" href="https://bing.com">bing.com</a>
				<p class="text-red-500">Inactive</p>
			</div>
			<div class="flex flex-col gap-2 my-auto ml-auto w-32">
				<Button style="primary">Activate</Button>
				<Button style="danger">Delete</Button>
			</div>
		</div>
	</div>
</div>

<style>
	.form {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.5rem;
	}

	.form-group {
		display: grid;
		grid-column: 1/ -1;
		grid-template-columns: subgrid;
		gap: 1.5rem;
	}
</style>
