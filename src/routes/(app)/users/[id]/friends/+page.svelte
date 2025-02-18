<script>
	import Listed from '$lib/components/users/Listed.svelte';

	export let data;
</script>

<div class="p-4 rounded-md divide-y-2 shadow-lg bg-secondary divide-white/20">
	<p class="pb-2 text-2xl font-bold">{data?.selectedUser?.username}'s Friends</p>

	<div class="grid grid-cols-3 grid-flow-row gap-2 pt-2 text-lg">
		{#each data.friends as user}
			<Listed {user} />
		{:else}
			<p class="col-span-3 mx-auto my-10 text-2xl text-white/50">
				this user doesnt have any friends. laugh at them.
			</p>
		{/each}
	</div>
</div>
