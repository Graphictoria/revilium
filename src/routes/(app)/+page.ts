import { user } from '$lib/client/stores.js';

export function load({ fetch }) {
	return new Promise((resolve) => {
		const cleanup = user.subscribe(async (value) => {
			if (!value) return;
			const response = await fetch('/api/user/' + value.id + '/friends');
			const { friends } = await response.json();

			resolve({ friends });
			cleanup();
		});
	});
}
