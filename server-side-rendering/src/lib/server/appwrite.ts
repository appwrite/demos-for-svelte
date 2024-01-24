import type { Cookies, RequestEvent } from '@sveltejs/kit';
import { Client, Account, Users } from 'luke-node-appwrite-ssr';
import { APPWRITE_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_ENDPOINT } from '$env/static/public';

export const SESSION_COOKIE = 'a_session';
const PROJECT_ID = 'ssr';

export function createAppwriteClient(
	event: RequestEvent,
	clientOptions?: { setKey?: boolean; setSession?: boolean }
) {
	const client = new Client().setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PROJECT_ID);

	const { setKey = true, setSession = true } = clientOptions ?? {};

	if (setKey) {
		client.setKey(APPWRITE_KEY);
	}

	const origin = event.request.headers.get('origin');
	if (origin) {
		client.setForwardedFor(origin);
	}

	const userAgent = event.request.headers.get('user-agent');
	if (userAgent) {
		client.setForwardedUserAgent(userAgent);
	}

	const session = event.cookies.get(SESSION_COOKIE);
	if (session && setSession) {
		client.setSession(session);
	}

	return {
		get account() {
			return new Account(client);
		},
		get users() {
			return new Users(client);
		}
	};
}
