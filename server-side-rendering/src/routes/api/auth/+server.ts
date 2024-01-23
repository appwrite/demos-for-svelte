import { SESSION_COOKIE } from '$lib/server/appwrite.js';

export async function GET({ url, locals, cookies }) {
	const { account } = locals.appwrite;

	const userId = url.searchParams.get('userId');
	const secret = url.searchParams.get('secret');

	const headers = new Headers();

	if (userId && secret) {
		const session = await account.createSession(userId, secret);

		console.log('session', session);

		const setCookie = cookies.serialize(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		});
		headers.set('set-cookie', setCookie);
	}

	headers.set('location', '/');

	return new Response(null, { status: 302, headers });
}
