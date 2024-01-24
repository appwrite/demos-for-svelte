import { SESSION_COOKIE, createAppwriteClient } from '$lib/server/appwrite.js';

export async function GET(event) {
	const userId = event.url.searchParams.get('userId');
	const secret = event.url.searchParams.get('secret');

	if (!userId || !secret) {
		throw new Error('Missing userId or secret');
	}

	const { account } = createAppwriteClient(event);
	const session = await account.createSession(userId, secret);

	if (!session.secret) {
		throw new Error('Missing session secret');
	}

	const headers = new Headers({
		location: '/'
	});

	headers.set(
		'set-cookie',
		event.cookies.serialize(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		})
	);

	return new Response(null, { status: 302, headers });
}
