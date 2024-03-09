import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite.js';
import { redirect } from '@sveltejs/kit';
import { ID } from 'node-appwrite';

export function load({ locals }) {
	if (locals.user) throw redirect(301, '/');
}

export const actions = {
	default: async (event) => {
		const { account } = createAdminClient();

		const form = await event.request.formData();

		const name = form.get('name') as string;
		const email = form.get('email') as string;
		const password = form.get('password') as string;

		await account.create(ID.unique(), email, password, name);
		const session = await account.createEmailPasswordSession(email, password);

		event.cookies.set(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		});

		throw redirect(301, '/');
	}
};
