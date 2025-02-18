<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Listed from '$lib/components/users/Listed.svelte';
	import SelectInput from '$lib/components/SelectInput.svelte';
	import { ROLE_MAP } from '$lib/config';
	import { WarningCircle } from 'phosphor-svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';

	let selectedUser: any = false;
	let selectedRole: string = 'USER';

	async function userIdUpdate(event: Event) {
		if (!event.target) return;
		const element = event.target as HTMLInputElement;

		const request = await fetch('/api/user/' + element.value);
		if (request.status !== 200) return (selectedUser = false);
		else selectedUser = await request.json();

		console.log(selectedUser);
	}
</script>

<PageMeta title="Change User Role" />

<div class="grid gap-2">
	<p class="p-2 w-min whitespace-nowrap rounded-md bg-secondary text-danger">
		<WarningCircle class="inline-block" size="22" /> This page is only functional for UserId 1
	</p>

	<form class="flex flex-col gap-2 w-96" method="post">
		<input
			class="p-1 rounded-md border-2 bg-surface0 placeholder:text-overlay0 w-full {selectedUser
				? ' border-green-500'
				: ' border-red-500'}"
			type="number"
			placeholder="User ID"
			min="1"
			name="id"
			id="id"
			on:change={userIdUpdate}
		/>
		<SelectInput name="role" bind:value={selectedRole}>
			{#each Object.keys(ROLE_MAP) as role}
				<option value={role}>{role}</option>
			{/each}
		</SelectInput>
		<Button style="primary">Set Role</Button>
	</form>
	<div class="w-96">
		{#key selectedUser}
			<Listed canUnfriend={false} user={selectedUser} />
		{/key}
	</div>
</div>
