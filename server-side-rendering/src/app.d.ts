import type { Models } from 'node-appwrite';
import type { AppwriteService } from '$lib/server/appwrite';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Models.User<Preferences> | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
