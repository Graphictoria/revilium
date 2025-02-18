<script lang="ts">
	import GenericImage from '$lib/components/GenericImage.svelte';

	export let user: { id: number; username: string; render?: { id?: string } };
</script>

<a class="flex flex-col space-y-1 w-28 h-full group" href="/users/{user?.id}/profile">
	<GenericImage
		src={user?.render?.id || '0'}
		classes={'w-28 h-28 bg-secondary shadow-lg rounded-full'}
	/>
	<p class="text-center group-hover:underline underline-offset-2">{user?.username}</p>
</a>
