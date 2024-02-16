import { createUserAppwrite } from '$lib/server/appwrite';

export async function handle({ event, resolve }) {
	const { account } = createUserAppwrite(event);

	try {
		event.locals.user = await account.get();
	} catch {}

	return resolve(event);
}
