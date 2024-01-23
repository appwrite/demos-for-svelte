import { SESSION_COOKIE } from '$lib/server/appwrite.js';
import { redirect } from '@sveltejs/kit';
import { ID } from 'luke-node-appwrite-ssr';

export function load({ locals }) {
	if (locals.user) throw redirect(301, '/');
}

export const actions = {
	default: async ({ request, locals, cookies }) => {
		const { account } = locals.appwrite;

		const form = await request.formData();

		const name = form.get('name') as string;
		const email = form.get('email') as string;
		const password = form.get('password') as string;

		console.table({ name, email, password });

		await account.create(ID.unique(), email, password, name);
		const session = await account.createEmailPasswordSession(email, password);

		cookies.set(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		});

		throw redirect(301, '/');
	}
};
