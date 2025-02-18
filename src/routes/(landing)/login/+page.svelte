<script>
	import Button from '$lib/components/Button.svelte';
	import HorizontalRule from '$lib/components/HorizontalRule.svelte';
	import NavigationButton from '$lib/components/landing/NavigationButton.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Turnstile from '$lib/components/Turnstile.svelte';
	import { WarningCircle } from 'phosphor-svelte';

	export let form;
</script>

<PageMeta title="Login" description="Login for Retro Blocks." />

<div class="flex flex-col gap-2.5">
	<form class="flex flex-col gap-1 mt-1" method="post">
		{#if form?.errors}
			{#each form.errors as error}
				<div class="flex gap-1 px-1 py-1.5 text-sm rounded-md bg-danger">
					<WarningCircle class="my-auto" size="23" />
					<p class="my-auto">{error.message}</p>
				</div>
			{/each}
		{/if}
		<TextInput type="username" name="username" placeholder="Username" />
		<TextInput type="password" name="password" placeholder="Password" />
		<div class="my-0.5">
			<Turnstile />
		</div>
		<Button style="primary">Login</Button>
	</form>
	<div class="flex place-content-between -mt-1 text-sm">
		<span class="text-left">
			<NavigationButton href="/recover">Forgot password?</NavigationButton>
		</span>
		<span class="text-right">
			<NavigationButton href="/register">Need an account?</NavigationButton>
		</span>
	</div>
</div>

<div class="flex flex-col mt-1 mb-2">
	<HorizontalRule />
</div>

<div class="flex gap-2">
	<button
		class="flex-grow py-1.5 rounded-md shadow-lg bg-surface0 outline outline-1 outline-overlay0"
	>
		Passkey Login
	</button>

	<button
		class="py-1.5 flex-grow rounded-md shadow-lg bg-[#5865f2] outline outline-1 outline-overlay0"
	>
		Discord Login
	</button>
</div>
