# SSR with SvelteKit & Appwrite

This is a demo of how to use SvelteKit with Appwrite for server-side rendering. It uses Appwrite `createEmailPasswordSession` and `createOAuth2Token` methods to authenticate. Includes a sign-in page, a sign-up page, and account page.

## Getting started

Create a new project on Appwrite console, and an API key with the following permissions:
- `sessions.write`

Create an OAuth2 GitHub app and then use the details to enable GitHub authentication on Appwrite console.

Copy the `.env.example` file to `.env` and fill in the required environment variables.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
