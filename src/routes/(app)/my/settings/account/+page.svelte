<script lang="ts">
	import { disableScrollHandling } from '$app/navigation';
	import { user } from '$lib/client/stores';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	export let data;

	let form: HTMLFormElement,
		confirmPassword: HTMLDialogElement,
		linkForm: HTMLFormElement,
		discordLinkDisabled = false;

	let newpassword = '',
		password = '',
		cpassword = '',
		email = '',
		discordToken = '';

	function obscureEmail(email?: string) {
		if (!email) return;
		let [name, domain] = email.split('@');
		return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
	}

	function discord() {
		discordLinkDisabled = true;

		const params =
			'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,\n' +
			'width=600,height=900,left=50%,top=50%';
		const popup = window.open(data.discordAuth.url, 'Discord Auth', params);

		const interval = setInterval(() => {
			if (!popup) return;
			popup.postMessage('', '*');
		}, 500);

		window.addEventListener(
			'message',
			(event) => {
				if (event.data.code && popup) {
					clearInterval(interval);
					popup.close();
					discordToken = event.data.code;
					setTimeout(() => {
						linkForm.submit();
					}, 500);
				}
			},
			false
		);
	}
</script>

<PageMeta title="Account Settings" description="Manage your settings." />

<div class="flex flex-col gap-2 divide-y-2 divide-zinc-500/30">
	<p class="text-2xl font-bold">Account</p>
	<div class="pt-2 w-full">
		<div class="flex flex-col gap-2">
			<div class="flex flex-col gap-1.5 max-w-xs">
				<p class="text-lg font-bold">Email</p>
				<TextInput
					type="email"
					name="email"
					placeholder={obscureEmail($user?.email) || ''}
					bind:value={email}
				/>
				<p class="max-w-xs text-xs text-subtext0">
					Your account will not be usable until the new address is confirmed.
				</p>
			</div>
			<div class="flex flex-col gap-1.5 max-w-xs">
				<p class="text-lg font-bold">Password</p>
				<TextInput
					type="password"
					name="newpassword"
					placeholder="New Password"
					bind:value={newpassword}
				/>
			</div>
			<div class="flex flex-col gap-1.5 max-w-xs">
				<p class="text-lg font-bold">Discord</p>
				{#if $user?.discord}
					<form action="?/unlink" method="post">
						<Button style="danger">Unlink Discord</Button>
					</form>
				{:else}
					<Button
						style="primary"
						on:click={() => {
							discord();
						}}
					>
						Link Discord
					</Button>
				{/if}
			</div>
			<div class="max-w-xs">
				<Button
					style="primary"
					on:click={() => {
						confirmPassword.showModal();
					}}
				>
					Save Changes
				</Button>
			</div>
		</div>
	</div>
</div>

<Modal bind:dialog={confirmPassword}>
	<form
		class="flex flex-col gap-1 max-w-md divide-y-2 divide-surface0"
		method="post"
		action="?/save"
		bind:this={form}
		on:submit|preventDefault
	>
		<p class="text-2xl font-bold text-text">Confirm Password</p>
		<div class="flex flex-col pt-1.5">
			<input type="hidden" name="email" bind:value={email} />
			<input type="hidden" name="newpassword" bind:value={newpassword} />
			<div class="w-[20rem] flex flex-col gap-2">
				<TextInput type="password" name="password" placeholder="Password" bind:value={password} />
				<TextInput
					type="password"
					name="cpassword"
					placeholder="Confirm Password"
					bind:value={cpassword}
				/>
			</div>
			<div class="flex gap-2">
				<button
					class="w-[50%] bg-surface0 px-3 py-1.5 rounded-md mt-2"
					on:click={() => {
						confirmPassword.close();
					}}>Cancel</button
				>
				<button
					class="w-[50%] bg-accent px-3 py-1.5 rounded-md mt-2"
					on:click={() => {
						form.submit();
					}}
				>
					Save Changes
				</button>
			</div>
		</div>
	</form>
</Modal>

<form action="?/link" method="post" bind:this={linkForm}>
	<input type="hidden" name="code" bind:value={discordToken} />
</form>
