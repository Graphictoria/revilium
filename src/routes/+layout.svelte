<script>
	import '../app.css';
</script>

<svelte:head>
	<script>
		const theme = localStorage.getItem('theme') || 'dark';
		const html = document.getElementsByTagName('html')[0];

		html.setAttribute('data-theme', theme);
	</script>
</svelte:head>

<slot />
