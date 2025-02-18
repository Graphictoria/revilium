<script lang="ts">
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	let selected = get(page).url.pathname.replace('/my/settings/', '');

	page.subscribe((_) => {
		selected = _.url.pathname.replace('/my/settings/', '');
	});
</script>

<div class="flex gap-2">
	<div class="w-48 rounded-md min-w-lg">
		<div class="flex flex-col rounded-md bg-secondary">
			<a
				href="profile"
				class="{selected === 'profile'
					? 'bg-zinc-100/10'
					: ''} p-2 rounded-t-lg transition-all hover:bg-zinc-100/10">Profile</a
			>
			<a
				href="account"
				class="{selected === 'account'
					? 'bg-zinc-100/10'
					: ''} p-2 transition-all hover:bg-zinc-100/10">Account</a
			>

			<a
				href="security"
				class="{selected === 'security'
					? 'bg-zinc-100/10'
					: ''} p-2 transition-all hover:bg-zinc-100/10">2FA</a
			>
			<a
				href="privacy"
				class="{selected === 'privacy'
					? 'bg-zinc-100/10'
					: ''} p-2 transition-all hover:bg-zinc-100/10">Privacy</a
			>
			<a
				href="appearance"
				class="{selected === 'appearance'
					? 'bg-zinc-100/10'
					: ''} p-2 transition-all hover:bg-zinc-100/10">Appearance</a
			>
			<a
				href="notifications"
				class="{selected === 'notifications'
					? 'bg-zinc-100/10'
					: ''} p-2 rounded-b-lg transition-all hover:bg-zinc-100/10">Notifications</a
			>
		</div>
	</div>
	<div class="flex-grow">
		<div class="p-3 rounded-md bg-secondary">
			<slot />
		</div>
	</div>
</div>
