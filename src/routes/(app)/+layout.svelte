<script>
	import { user } from '$lib/client/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Banner from '$lib/components/ads/Banner.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { env } from '$env/dynamic/public';

	const pinger = async () => {
		const response = await fetch('/api/ping');
		const body = await response.json();
		$user.friendRequests = body?.friendRequests;
		$user.currency = body?.currency;
		$user.stipend = body?.stipend;
	};

	onMount(async () => {
		if (!$user || $user.pinger) return;
		pinger();
		$user.pinger = setInterval(pinger, 10_000);
	});
</script>

<svelte:head>
	{#if env.PUBLIC_UMAMI_DOMAIN && env.PUBLIC_UMAMI_ID}
		<script
			defer
			src="https://{env.PUBLIC_UMAMI_DOMAIN}/script.js"
			data-website-id={env.PUBLIC_UMAMI_ID}
		></script>
	{/if}
</svelte:head>

<header class="fixed z-50 w-full h-16">
	<Header />
</header>

<div class="flex">
	<div class="fixed top-0 z-10 h-screen">
		<Sidebar />
	</div>

	<div class="container pt-20 mx-auto mb-4 min-h-screen">
		{#key $page.url}
			<Banner />
		{/key}

		<slot />
	</div>
</div>

<div class="">
	<Footer />
</div>
