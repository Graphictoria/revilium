import type { AccessTokenData } from '$lib/server/jwt';

declare global {
	namespace App {
		interface Error {
			status?: number;
			errors?: Array<{ key?: string | number; message?: string }>;
		}
		interface Locals {
			user: AccessTokenData;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
