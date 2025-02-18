<script lang="ts">
	import { getSVG } from 'qreator/lib/svg';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Button from '$lib/components/Button.svelte';

	export let data;
	export let form;

	let token = '',
		password = '';

	let authenticatorSetup: HTMLDialogElement, authenticatorForm: HTMLFormElement;

	async function generateQR() {
		return getSVG(data.uri || 'lal', {
			color: '#7f58d3',
			bgColor: '#18181b',
			size: 512,
			logo: await (await fetch('/img/ReviliumCat.png')).arrayBuffer(),
			logoHeight: 50,
			logoWidth: 50,
			ec_level: 'H',
			borderRadius: 5,
			margin: 0
		});
	}
</script>

<PageMeta title="Security Settings" description="Manage your settings." />

<div class="flex flex-col gap-2 divide-y-2 divide-zinc-500/30">
	<p class="text-2xl font-bold">Security</p>
	<div class="pt-2 w-full">
		<div class="flex flex-col gap-2 w-full">
			<div class="flex flex-col gap-1">
				<div>
					<p class="text-lg font-bold">Authenticator</p>
					<p class="max-w-xs text-xs text-subtext0">Recommended</p>
				</div>
				<div class="flex gap-2 mt-2 w-[10rem]">
					{#if data.secret}
						<Button
							style="primary"
							on:click={() => {
								authenticatorSetup.showModal();
							}}>Setup</Button
						>
					{:else}
						<Button
							style="danger"
							disabled={true}
							on:click={() => {
								authenticatorSetup.showModal();
							}}>Disable</Button
						>
					{/if}
					{#if form && form?.type == 'authenticator'}
						<p class="my-auto {form?.success ? 'text-green-500' : 'text-red-500'}">
							{form?.message}
						</p>
					{/if}
				</div>
			</div>
			<div class="flex flex-col gap-1">
				<div>
					<p class="text-lg font-bold">Passkeys</p>
					<p class="max-w-xs text-xs text-subtext0">Acts as a password replacement</p>
				</div>
				<button
					disabled={true}
					class="disabled:bg-zinc-600 disabled:text-white/50 max-w-[10rem] bg-accent px-2 py-1.5 rounded-md mt-2 shadow-lg"
					>Add</button
				>
			</div>
			<div class="flex flex-col gap-1">
				<div>
					<p class="text-lg font-bold">Email</p>
					<p class="max-w-xs text-xs text-subtext0">Not recommended</p>
				</div>
				<button
					disabled={true}
					class="disabled:bg-zinc-600 disabled:text-white/50 max-w-[10rem] bg-accent px-2 py-1.5 rounded-md mt-2 shadow-lg"
					>Enable</button
				>
			</div>
			<div class="flex flex-col gap-1">
				<div>
					<p class="text-lg font-bold">Recovery Codes</p>
					<p class="max-w-xs text-xs text-subtext0">
						You can only view these once. Make sure to keep them safe!
					</p>
				</div>
				<button
					disabled={true}
					class=" disabled:bg-zinc-600 disabled:text-white/50 max-w-[10rem] bg-accent px-2 py-1.5 rounded-md mt-2 shadow-lg"
					>View</button
				>
			</div>
		</div>
	</div>
</div>

<Modal bind:dialog={authenticatorSetup}>
	<form
		class="flex flex-col gap-2"
		method="post"
		action="?/authenticator"
		on:submit|preventDefault
		bind:this={authenticatorForm}
	>
		{#await generateQR()}
			<div class="w-64 h-64 rounded-md animate-pulse bg-zinc-500/50" />
		{:then qr}
			<img
				class="w-64 h-64"
				src="data:image/svg+xml;base64,{btoa(new TextDecoder('utf8').decode(qr))}"
				alt=""
			/>
		{/await}
		<tt class="mx-auto tracking-widest w-fit">{data.secret}</tt>
		<input
			class="p-1 max-w-xs text-white rounded-md bg-zinc-800 outline outline-2 outline-zinc-700 placeholder:text-zinc-500"
			type="text"
			id="token"
			name="token"
			placeholder="2FA Token"
			required
			bind:value={token}
		/>
		<input
			class="p-1 max-w-xs text-white rounded-md bg-zinc-800 outline outline-2 outline-zinc-700 placeholder:text-zinc-500"
			type="password"
			id="password"
			name="password"
			placeholder="Confirm Password"
			required
			bind:value={password}
		/>
		<input type="hidden" name="secret" value={data.secret} />
		<div class="flex gap-1">
			<button
				class="w-[50%] bg-zinc-800 px-3 py-1.5 rounded-md"
				on:click={() => {
					authenticatorSetup.close();
				}}
			>
				Cancel
			</button>
			<button
				class="w-[50%] bg-accent px-3 py-1.5 rounded-md shadow-lg"
				on:click={() => {
					if (!token.length || !password.length) return;
					authenticatorForm.submit();
				}}
			>
				Enable
			</button>
		</div>
	</form>
</Modal>
