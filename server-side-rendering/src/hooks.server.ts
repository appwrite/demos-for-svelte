import { createAppwriteClient } from '$lib/server/appwrite';

export async function handle({ event, resolve }) {
	const { account } = createAppwriteClient(event);

	let user = null;
	try {
		user = await account.get();
	} catch (error) {}

	event.locals.user = user && user.$id ? user : null;

	return resolve(event);
}
