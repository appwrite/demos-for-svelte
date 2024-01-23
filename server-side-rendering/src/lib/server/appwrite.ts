import type { Cookies } from '@sveltejs/kit';
import { Client, Account, type Models, Users } from 'luke-node-appwrite-ssr';
import { APPWRITE_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_ENDPOINT } from '$env/static/public';

export const SESSION_COOKIE = 'a_session';
const PROJECT_ID = 'ssr';

export class AppwriteService {
	client: Client;
	account: Account;
	users: Users;

	constructor() {
		this.client = new Client()
			.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
			.setProject(PROJECT_ID)
			.setKey(APPWRITE_KEY);

		this.account = new Account(this.client);
		this.users = new Users(this.client);
	}

	setSessionFromCookies(cookies: Cookies): boolean {
		const session = cookies.get(SESSION_COOKIE);
		if (!session) return false;

		this.client.setSession(session);
		return true;
	}

	setForwardedHeaders(headers: Headers): void {
		const originalIp = headers.get('origin');
		if (originalIp) this.client.setForwardedFor(originalIp);

		const userAgent = headers.get('user-agent');
		if (userAgent) this.client.setForwardedUserAgent(userAgent);
	}

	async getLoggedInUser(): Promise<Models.User<Models.Preferences> | null> {
		let user: Models.User<Models.Preferences> | null;
		try {
			user = await this.account.get();
		} catch (error) {
			return null;
		}

		if (!user.$id) return null;

		return user;
	}
}
