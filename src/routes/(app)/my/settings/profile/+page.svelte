<script lang="ts">
	import { ECONOMY_USERNAME_CHANGE, ECONOMY_CURRENCY_NAME } from '$lib/config';
	import { user } from '$lib/client/stores';
	import Modal from '$lib/components/Modal.svelte';
	import { get } from 'svelte/store';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Button from '$lib/components/Button.svelte';

	export let form;

	let username = '',
		pronouns = '',
		description = '';

	let confirmUsernameChange = false,
		disableSubmit = false,
		htmlform: HTMLFormElement;

	function submit() {
		if (username.length && username !== get(user).username && !confirmUsernameChange) {
			return (confirmUsernameChange = true);
		}

		htmlform.submit();
	}
</script>

<PageMeta title="Profile Settings" description="Manage your settings." />

<div class="flex flex-col gap-2 divide-y-2 divide-zinc-500/30">
	<p class="text-2xl font-bold">Profile</p>
	<div class="pt-2 w-full">
		<form
			class="flex flex-col gap-2 w-full"
			method="post"
			on:submit|preventDefault={submit}
			bind:this={htmlform}
		>
			<div class="flex flex-col gap-1.5 max-w-xs">
				<p class="text-lg font-bold">Username</p>
				<TextInput
					type="text"
					name="username"
					placeholder={form?.data?.username || $user?.username || ''}
					bind:value={username}
				/>
				<p class="text-xs text-subtext0">
					Your account will be charged {ECONOMY_USERNAME_CHANGE}
					{ECONOMY_CURRENCY_NAME}.
				</p>
			</div>
			<div class="flex flex-col gap-1.5 max-w-xs">
				<p class="text-lg font-bold">Pronouns</p>
				<TextInput
					type="text"
					name="pronouns"
					placeholder={form?.data?.pronouns || $user?.pronouns || ''}
					bind:value={pronouns}
				/>
			</div>
			<div class="flex flex-col gap-1.5">
				<p class="text-lg font-bold">Description</p>
				<textarea
					class="p-1 w-full rounded-md border-2 bg-surface0 border-overlay0 placeholder:text-overlay0"
					name="description"
					rows="7"
					cols="10"
					maxlength="500"
					placeholder={form?.data?.description || $user?.description}
					bind:value={description}
				/>
			</div>
			<div class="flex gap-3.5 max-w-xs">
				<Button style="primary" disabled={disableSubmit}>Save Changes</Button>
				{#if form && !form.success}
					<p class="my-auto {form.success ? '' : 'text-red-500'}">
						{form?.message}
					</p>
				{/if}
			</div>
		</form>
	</div>
</div>

<Modal showModal={confirmUsernameChange}>
	<div class="flex flex-col gap-2 max-w-md divide-y-2 divide-white/20">
		<p class="text-2xl font-bold">Username Change</p>
		<div class="flex flex-col">
			<p class="pt-2 pb-1">
				Are you sure you want to change your username? This will charge your account <span
					class="font-bold"
					>{ECONOMY_USERNAME_CHANGE}
					{ECONOMY_CURRENCY_NAME}</span
				>. This is not refundable.
			</p>
			<div class="flex gap-2">
				<button
					class="w-[50%] bg-zinc-800 px-3 py-1.5 rounded-md mt-2"
					on:click={() => {
						confirmUsernameChange = false;
					}}
				>
					Cancel
				</button>
				<button class="w-[50%] bg-accent px-3 py-1.5 rounded-md mt-2 shadow-lg" on:click={submit}>
					Change Username
				</button>
			</div>
		</div>
	</div>
</Modal>
