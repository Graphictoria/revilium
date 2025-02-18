import { writable, type Writable } from 'svelte/store';

interface Render {
	id: number;
	status: 'DELETED' | 'REVIEW' | 'PUBLIC';
}

interface User {
	id?: number;
	username?: string;
	email?: string;
	joinDate?: Date;
	lastOnline?: Date;
	currency?: number;
	role?: string;
	description?: string;
	pronouns?: string;
	discord?: string;
	render?: Render;
	pinger?: any;
	friendRequests?: number;
	stipend?: Date;
}

export const user: Writable<User> = writable();
