import { AppwriteService } from '$lib/server/appwrite';

export async function handle({ event, resolve }) {
	const appwrite = new AppwriteService();

	appwrite.setForwardedHeaders(event.request.headers);

	const hasSessionCookie = appwrite.setSessionFromCookies(event.cookies);
	event.locals.appwrite = appwrite;

	if (hasSessionCookie) {
		const user = await appwrite.getLoggedInUser();
		event.locals.user = user;
	}

	return resolve(event);
}
