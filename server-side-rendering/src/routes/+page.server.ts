import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(301, '/signin');
	}

	throw redirect(301, '/account');
}
