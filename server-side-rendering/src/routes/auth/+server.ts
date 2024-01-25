import { SESSION_COOKIE, createAppwriteClient } from '$lib/server/appwrite.js';
import { error } from '@sveltejs/kit';

export async function GET(event) {
	const userId = event.url.searchParams.get('userId');
	const secret = event.url.searchParams.get('secret');

	if (!userId || !secret) {
		throw error(500, 'OAuth failed - no userId or secret passed');
	}

	const { account } = createAppwriteClient(event);
	const session = await account.createSession(userId, secret);

	if (!session || !session.secret) {
		throw error(500, 'Create session from token failed - no session or secret');
	}

	const headers = new Headers({
		location: '/account'
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
