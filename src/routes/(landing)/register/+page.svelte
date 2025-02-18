<script>
	import Button from '$lib/components/Button.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Turnstile from '$lib/components/Turnstile.svelte';
	import { SITE_NAME } from '$lib/config';
	import { WarningCircle } from 'phosphor-svelte';

	export let form;
</script>

<PageMeta title="Register" description="Register for an account on {SITE_NAME}." />

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
		<TextInput type="email" name="email" placeholder="Email Address" />
		<TextInput type="password" name="password" placeholder="Password" />
		<TextInput type="password" name="cpassword" placeholder="Confirm Password" />
		<TextInput type="text" name="invite" placeholder="Invite Key" />
		<div class="my-0.5">
			<Turnstile />
		</div>
		<Button style="primary">Register</Button>
	</form>
	<div class="flex text-sm">
		<a class="w-full text-right text-accent" href="/login">Have an account?</a>
	</div>
</div>
