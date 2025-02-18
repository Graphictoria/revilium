<script>
	import Button from '$lib/components/Button.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { WarningCircle } from 'phosphor-svelte';

	export let form;
</script>

<PageMeta title="2FA" />

<div class="flex flex-col mt-0.5 mb-2">
	<p class="text-2xl">Two-Factor Authentication</p>
	<p class="text-sm text-subtext0">
		Open your authenticator app and enter the given code to proceeed.
	</p>
</div>

<form class="flex flex-col gap-2" method="POST">
	<div class="flex flex-col">
		<TextInput type="2fa" name="twofactor" placeholder="Enter 6 digit code" />
		{#if form && form.errors.find((_) => {
				return _.key === 'twofactor';
			})}
			<p
				class="flex absolute gap-1 px-1 text-sm leading-8 text-red-500 rounded-md transition-all pointer-events-none bg-surface0 peer-focus:hidden peer-[:not(:placeholder-shown)]:hidden"
			>
				<WarningCircle class="my-auto" size="20" />
				{form.errors.find((_) => {
					return _.key === 'twofactor';
				})?.message}
			</p>
		{/if}
	</div>
	<Button style="primary">Verify</Button>
</form>
