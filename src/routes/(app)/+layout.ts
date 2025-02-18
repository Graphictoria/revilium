import { user } from '$lib/client/stores.js';
import { get } from 'svelte/store';

export const load = async ({ fetch, data }) => {
	if (!get(user)) {
		const response = await fetch(`/api/user/${data.user.id}`);
		const body = await response.json();
		user.set(body);
	}
};
