import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { PUBLIC_APPWRITE_ENDPOINT } from '$env/static/public';

export function signInWithGithub() {
	if (!browser) return;

	const url = new URL(`${PUBLIC_APPWRITE_ENDPOINT}/account/sessions/oauth2/github`);

	url.searchParams.set('project', 'ssr');
	url.searchParams.set('success', `${window.location.origin}/auth`);
	url.searchParams.set('failure', `${window.location.origin}/`);
	url.searchParams.set('token', `true`); // Crucial: Set token to true to get a auth token in the success URL

	goto(url.toString());
}
