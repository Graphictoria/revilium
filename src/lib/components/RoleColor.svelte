<script lang="ts">
	const ROLE_COLORS = {
		BANNED: 'text-white/50 line-through',
		USER: 'text-white/50',
		BC: 'text-role-bc',
		TBC: 'text-role-tbc',
		OBC: 'text-role-obc',
		CATALOG_MANAGER: 'text-role-catalog_manager',
		ADMINISTRATOR: 'text-role-administrator',
		DEVELOPER: '[background-image:--revilium-role-developer] bg-clip-text text-transparent',
		SYSTEM: 'text-black'
	};

	export let role: keyof typeof ROLE_COLORS = 'USER';
</script>

<span class={ROLE_COLORS[role]}>
	<slot />
</span>
