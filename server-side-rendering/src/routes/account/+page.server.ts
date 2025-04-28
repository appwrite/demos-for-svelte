import { SESSION_COOKIE, createSessionClient } from '$lib/server/appwrite.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) throw redirect(301, '/signin');

	return {
		user: locals.user
	};
}

export const actions = {
	default: async (event) => {
		const { account } = createSessionClient(event);

		await account.deleteSession('current');
		event.cookies.delete(SESSION_COOKIE);

		throw redirect(301, '/signin');
	}
};
