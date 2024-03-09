import type { RequestEvent } from '@sveltejs/kit';
import { Client, Account } from 'node-appwrite';
import { APPWRITE_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT_ID } from '$env/static/public';

export const SESSION_COOKIE = 'my-custom-session';

export function createSessionClient(event: RequestEvent) {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID);

	const session = event.cookies.get(SESSION_COOKIE);
	if (!session) {
		throw new Error('No session');
	}

	client.setSession(session);

	return {
		get account() {
			return new Account(client);
		}
	};
}

export function createAdminClient() {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT_ID)
		.setKey(APPWRITE_KEY);

	return {
		get account() {
			return new Account(client);
		}
	};
}
