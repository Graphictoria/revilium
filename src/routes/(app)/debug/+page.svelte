<script>
	import { user } from '$lib/client/stores';
	import * as config from '$lib/config';

	import PageMeta from '$lib/components/PageMeta.svelte';
	import Turnstile from '$lib/components/Turnstile.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Check, Question, QuestionMark, X } from 'phosphor-svelte';
	import { fade, scale, slide } from 'svelte/transition';

	export let form;

	let action1 = true;
</script>

<PageMeta title="Debug" description="" />

<div class="flex flex-col space-y-4">
	<div class="flex flex-col space-y-2 divide-y-2 divide-white/50">
		<h1 class="text-2xl font-bold">User Store</h1>
		<div class="flex flex-col pt-2 space-y-1">
			<p class="p-3 font-mono whitespace-pre-wrap rounded bg-secondary">
				Logged in: <span class={!!$user?.id ? 'text-green-500' : 'text-red-500'}>{!!$user?.id}</span
				>
			</p>

			<p class="p-3 font-mono whitespace-pre-wrap rounded bg-secondary">
				Role: <span class="text-blue-500">{$user?.role}</span>
			</p>

			<p class="p-3 font-mono whitespace-pre-wrap rounded bg-secondary">
				Last ping: <span class="text-blue-500">{$user?.lastOnline}</span>
			</p>

			<p class="p-3 font-mono whitespace-pre-wrap rounded bg-secondary">
				{JSON.stringify($user, null, 4)}
			</p>
		</div>
	</div>

	<div class="flex flex-col space-y-2 divide-y-2 divide-white/50">
		<h1 class="text-2xl font-bold">Site Configuration</h1>
		<div class="flex flex-col pt-2 space-y-1">
			<p class="p-3 font-mono whitespace-pre-wrap rounded bg-secondary">
				{JSON.stringify(config, null, 4)}
			</p>
		</div>
	</div>

	<div class="flex flex-col space-y-2 divide-y-2 divide-white/50">
		<h1 class="text-2xl font-bold">Turnstile</h1>
		<div class="flex flex-col pt-2 space-y-1">
			{#if form}
				<tt
					class="w-[18.75rem] py-1 px-2 bg-zinc-900 {form?.success
						? 'text-green-500'
						: 'text-red-500'}"
				>
					{form?.message}
				</tt>
			{/if}

			<form method="POST" class="flex flex-col gap-2 max-w-min">
				<Turnstile />
				<Button style="primary">Submit</Button>
			</form>
		</div>
	</div>

	<div class="flex flex-col space-y-2 divide-y-2 divide-white/50">
		<h1 class="text-2xl font-bold">Animated Actions</h1>
		<div class="flex flex-col gap-2 pt-2">
			<div class="flex flex-col gap-2 w-96">
				<Button
					style="primary"
					on:click={() => {
						action1 = !action1;
					}}>Toggle</Button
				>
			</div>
			<div class="flex flex-col gap-2 w-96 h-[172px]">
				{#if action1}
					<div
						transition:fade
						class="flex gap-1.5 p-3 font-bold rounded-md shadow-lg text-danger bg-secondary"
					>
						<X class="my-auto" size="24" />
						<p>you suck</p>
					</div>
					<div
						transition:scale
						class="flex gap-1.5 p-3 font-bold rounded-md shadow-lg text-warning bg-secondary"
					>
						<QuestionMark class="my-auto" size="24" />
						<p class="my-auto">are you sure?</p>
						<div class="flex gap-1.5 ml-auto whitespace-nowrap">
							<Button style="primary">yes bro</Button>
							<Button style="secondary">no bro</Button>
						</div>
					</div>
					<div
						transition:slide={{ axis: 'y' }}
						class="flex gap-1.5 p-3 font-bold rounded-md shadow-lg text-accent bg-secondary"
					>
						<Check class="my-auto" size="24" />
						<p>#winner</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
