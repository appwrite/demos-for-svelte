import { createSessionClient } from '#lib/server/appwrite.js';

export async function handle({ event, resolve }) {
	try {
		const { account } = createSessionClient(event);
		event.locals.user = await account.get();
	} catch {}

	return resolve(event);
}
