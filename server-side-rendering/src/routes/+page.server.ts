import { SESSION_COOKIE } from '$lib/server/appwrite.js';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) throw redirect(301, '/signin');

	return {
		user: locals.user
	};
}

export const actions = {
	default: async ({ locals, cookies }) => {
		const { account } = locals.appwrite;

		await account.deleteSession('current');
		cookies.delete(SESSION_COOKIE);

		throw redirect(301, '/signin');
	}
};
