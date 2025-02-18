<script>
	import Link from '$lib/components/Link.svelte';
	import PageMeta from '$lib/components/PageMeta.svelte';
</script>

<PageMeta title="(Temporary) Admin Panel" />

<div class="grid">
	<Link href="/admin/user/moderate">Moderate User</Link>
	<Link href="/admin/user/role">Promote/Demote User</Link>
	<Link href="/admin/asset/queue">Asset Queue</Link>
	<Link href="/admin/thumbnail/asset">Manage Asset Thumbnail</Link>
	<Link href="/admin/thumbnail/user">Manage User Thumbnail</Link>
	<Link href="/admin/thumbnail/universe">Manage Universe Thumbnail</Link>
	<Link href="/admin/invite">Create/View Invites</Link>
</div>
