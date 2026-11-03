import { defineEnvVars } from '@sveltejs/kit/env';

// Placeholders let the demo build before .env is filled in; set real values to run it.
export const variables = defineEnvVars({
	PUBLIC_APPWRITE_ENDPOINT: {
		public: true,
		static: true,
		schema: (value) => value || 'https://cloud.appwrite.io/v1'
	},
	PUBLIC_APPWRITE_PROJECT_ID: { public: true, static: true, schema: (value) => value ?? '' },
	APPWRITE_KEY: { static: true, schema: (value) => value ?? '' }
});
