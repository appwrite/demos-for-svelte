import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_APPWRITE_ENDPOINT: { public: true, static: true },
	PUBLIC_APPWRITE_PROJECT_ID: { public: true, static: true },
	APPWRITE_KEY: { static: true }
});
