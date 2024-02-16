import { SESSION_COOKIE, createAdminAppwrite } from '$lib/server/appwrite.js';
import { error } from '@sveltejs/kit';

export async function POST(event) {
	const { account } = createAdminAppwrite();

	const successUrl = `${event.url.origin}/oauth`;
	const failureUrl = `${event.url.origin}/signin?error=1`;

	const redirectUrl = await account.createOAuth2Token('github', successUrl, failureUrl);

	return Response.redirect(redirectUrl, 302);
}

export async function GET(event) {
	const userId = event.url.searchParams.get('userId');
	const secret = event.url.searchParams.get('secret');

	if (!userId || !secret) {
		throw error(500, 'OAuth failed - no userId or secret passed');
	}

	const { account } = createAdminAppwrite();
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
