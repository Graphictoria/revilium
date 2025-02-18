<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Link from '$lib/components/Link.svelte';

	export let data;
	export let form;
</script>

<div class="flex gap-2 mb-2">
	<form
		class="grid flex-grow-0 flex-shrink-0 gap-2 p-2 mb-2 w-96 rounded-md bg-secondary h-min"
		method="post"
	>
		<input
			class="p-1 w-full rounded-md border-2 bg-surface0 border-overlay0 placeholder:text-overlay0 peer"
			type="number"
			id="invites"
			name="invites"
			placeholder="1"
		/>
		<Button style="primary">Create Invite(s)</Button>
	</form>
	<div class="flex flex-col p-3 bg-secondary">
		{#if form?.invites}
			{#each form?.invites as invite}
				<tt>{invite.value}</tt>
			{/each}
		{/if}
	</div>
</div>
<table class="w-full border-2 shadow-lg border-overlay0">
	<tr class="text-lg text-left border-b-2 border-overlay0 bg-accent">
		<th class="p-1 whitespace-nowrap">Invite</th>
		<th class="p-1 whitespace-nowrap">Created By</th>
		<th class="p-1 whitespace-nowrap">Created On</th>
		<th class="p-1 whitespace-nowrap">Used By</th>
		<th class="p-1 whitespace-nowrap">Used On</th>
	</tr>
	{#each data.invites as invite}
		<tr class="border-b-2 border-overlay0">
			<td class="py-1">{invite.value}</td>
			<td class="py-1">
				<Link href="/users/{invite.createdById || 1}/profile">{invite.createdById || 'System'}</Link
				>
			</td>
			<td class="py-1" title={invite.created.toLocaleTimeString()}>
				{invite.created.toLocaleDateString()}
			</td>
			<td class="py-1">
				{#if invite.usedById}
					<Link href="/users/{invite?.usedById}/profile">{invite.usedById}</Link>
				{:else}
					<p class="text-subtext0">Unused</p>
				{/if}
			</td>
			<td class="py-1" title={invite.used?.toLocaleTimeString()}>
				{#if invite.usedById}
					{invite.used?.toLocaleDateString()}
				{:else}
					<p class="text-subtext0">Unused</p>
				{/if}
			</td>
		</tr>
	{/each}
</table>
