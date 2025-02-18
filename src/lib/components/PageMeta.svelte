<script>
	import { SITE_NAME } from '$lib/config';
	import { page } from '$app/stores';

	export let title,
		description = '';
</script>

<svelte:head>
	<title>{title} - {SITE_NAME}</title>
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={title} />
	<meta property="og:url" content={$page.url.toString()} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{$page.url.origin}/img/ReviliumCat.png" />
	<meta name="theme-color" content="#7f58d3" />
</svelte:head>
