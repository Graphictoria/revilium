<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Listed from '$lib/components/users/Listed.svelte';
	import HorizontalRule from '$lib/components/HorizontalRule.svelte';
	import GenericImage from '$lib/components/GenericImage.svelte';
	import SelectInput from '$lib/components/SelectInput.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';

	let selectedUser: any = false;
	let moderationType: string = 'warning';

	async function userIdUpdate(event: Event) {
		if (!event.target) return;
		const element = event.target as HTMLInputElement;

		const request = await fetch('/api/user/' + element.value);
		if (request.status !== 200) return (selectedUser = false);
		else selectedUser = await request.json();

		console.log(selectedUser);
	}
</script>

<PageMeta title="Moderate User" />

<div class="flex gap-2">
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
		<textarea
			class="p-1 w-full rounded-md border-2 bg-surface0 border-overlay0 placeholder:text-overlay0"
			name="reason"
			rows="7"
			cols="10"
			maxlength="500"
			placeholder="Reason"
		/>
		<SelectInput name="type" bind:value={moderationType}>
			<option value="warning">Warning</option>
			<option value="ban">Ban</option>
			<option value="terminate">Terminate</option>
		</SelectInput>
		{#if moderationType === 'ban'}
			<input
				class="p-1 w-full rounded-md border-2 bg-surface0 border-overlay0"
				type="date"
				id="unban"
				name="unban"
			/>
		{/if}
		<Button style="danger">
			<img class="w-[75%] mx-auto" src="https://snep.lol/download/qyBIqRgOsA.gif" alt="" />
		</Button>
	</form>
	<div class="w-96">
		{#key selectedUser}
			<Listed canUnfriend={false} user={selectedUser} />
		{/key}
	</div>
</div>
