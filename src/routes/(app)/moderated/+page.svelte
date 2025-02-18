<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
	import { SITE_NAME } from '$lib/config';

	export let data;
</script>

<div class="p-3 mx-auto max-w-2xl rounded-md bg-secondary">
	{#if data.moderationType === 'ban'}
		<h1 class="pt-1 pb-2 text-3xl font-bold">Banned</h1>
		<PageMeta title="Banned" />
	{:else if data.moderationType === 'warning'}
		<h1 class="pt-1 pb-2 text-3xl font-bold">Warning</h1>
		<PageMeta title="Warning" />
	{:else if data.moderationType === 'terminated'}
		<h1 class="pt-1 pb-2 text-3xl font-bold">Account Terminated</h1>
		<PageMeta title="Account Terminated" />
	{/if}
	<p class="mb-2 text-subtext0">
		Our moderators have determined that you have broke the {SITE_NAME} Terms of Serivce. Your account
		has been restricted. Any attempt to circumvent this restriction will result in termination. This
		decision cannot be appealed.
	</p>
	<div class="grid gap-2 mb-3">
		{#if data.moderationType === 'ban'}
			<div class="">
				<p class="text-lg">Unbanned On</p>
				<p class="text-subtext0">{data.unbannedOn.toString()}</p>
			</div>
		{/if}
		<div class="">
			<p class="text-lg">Moderator Note</p>
			<p class="text-subtext0">{data.note}</p>
		</div>

		<div class="flex flex-col gap-2">
			{#each data.actions as action}
				<div class="flex flex-col gap-0.5 p-2 border-2 border-overlay0">
					<p class="font-bold">{action.type}</p>
					<div class="text-subtext0">{@html action.content}</div>
				</div>
			{/each}
		</div>
	</div>
	{#if data.moderationType == 'warning'}
		<Button style="primary">Reactivate Account</Button>
	{:else}
		<Button style="secondary">Logout</Button>
	{/if}
</div>
