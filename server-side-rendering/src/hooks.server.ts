import { createUserAppwrite } from '$lib/server/appwrite';

export async function handle({ event, resolve }) {
	const appwrite = createUserAppwrite(event);

	if (appwrite) {
		try {
			event.locals.user = await appwrite.account.get();
		} catch {}
	}

	return resolve(event);
}
