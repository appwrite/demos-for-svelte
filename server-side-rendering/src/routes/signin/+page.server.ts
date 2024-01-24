import { SESSION_COOKIE, createAppwriteClient } from '$lib/server/appwrite.js';
import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (locals.user) throw redirect(301, '/');
}

export const actions = {
	default: async (event) => {
		const { account } = createAppwriteClient(event);

		const form = await event.request.formData();

		const email = form.get('email') as string;
		const password = form.get('password') as string;

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
