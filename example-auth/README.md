# Appwrite + Svelte = ❤️

This example is to showcase [Appwrite's JS API](https://github.com/appwrite/sdk-for-js) with [Svelte](https://svelte.dev/) by creating a simple login/register page.

## Prerequisites

 - A Recent Version of NodeJS
 - NPM (Feel free to use Yarn if you want to, just switch out the NPM Commands for their Yarn counterparts)
 - [A locally running appwrite instance](https://appwrite.io/docs/installation).

## Getting Started
To get started quickly we will use degit to create the foundation for our project.
```bash
npx degit sveltejs/template appwrite-svelte
cd appwrite-svelte
npm install
```
This will create a Svelte project in the `appwrite-svelte` folder relative to where the commands was run aswell as install any dependencies.

While we are in the CLI we will install the Appwrite JS API by running:
````bash
npm install appwrite
````
and finally, we will launch the svelte development server with:
```bash
npm run dev
```
This should launch a server on `localhost:5000` with Live Reload

## Introducing the Appwrite SDK
With this boilerplate we can now initialise the Appwrite SDK in the project before working on the login page. Doing this is simple go ahead and open up `src/main.js`and underneath `import App from './App.svelte';` add:
```js
import 'appwrite';
const appwrite = new window.Appwrite();  // Used for compatibility with a <script> imported appwrite installation
appwrite
  .setEndpoint('http://localhost/v1')  // Set only when using self-hosted solution
  .setProject('ProjectID');
```
What this does is import the Appwrite JS SDK and then initialises it with the Endpoint and ProjectID, make sure to replace `projectID` with the projectID that you created in appwrite. This will give us a `appwrite` object able to use the SDK methods we need.

One more thing we want to do is pass this appwrite object though props to `src/App.svelte` we can do this by finding:
```js
const app =  new App({
  target: document.body,
  props:  {
    name:  'world'
  }
});
```
and adding `appwrite: appwrite` to the props object and removing the name prop so it looks like this:
```js
const app =  new App({
  target: document.body,
  props:  {
    appwrite: appwrite
  }
});
```
This means that the appwrite object is now accesible in `src/App.svelte` through a prop.

## Creating the Login Page Logic
Creating the Login Page is easy, go ahead and navigate to `src/App.svelte`  and remove all code within it, as we will be replacing this with our login form code with this removed we will move onto creating the logic behind this.

First we want to start working on the script powering this, add the following to the top of `src/App.svelte`
```svelte
<script>
	export let appwrite
	import { onMount } from 'svelte'

	let username = '' // These will store the change in inputs for the login process
	let password = ''
	let error = false
	let loading = false
	let page = false
	let userprofile = false

	const logout = () => {
		userprofile = false;
		appwrite.account.deleteSession('current');
	}

	const getUserdata = async () => {
		try {
			const response = await appwrite.account.get();
		     		loading =  false;
			userprofile = response;
		} catch(err) {
			if (err == 'Error: Unauthorized') return;
			error = err;
		}
	}
	
	onMount(getUserdata);

	const login = async (event) => {
		if (loading) return; // If still processing previous request then don't start a new one
		try {
			error = false;
			loading = true;
			const response = await appwrite.account.createSession(
				event.target.email.value, 
				event.target.password.value
			);
			getUserdata();
		} catch(error) {
			loading = false;
			error =  'Invalid Credentials';
			console.error(error);
		}
	}
</script>
```

So, let's explain this script. First we grab the appwrite prop from the parent by using `export let appwrite` without this we won't be able to run API Calls, We then setup some variables to store various data we will use later. Including the username, passsword and a few other variables.

The login function which will be called on form submit will do the following:

 1. Check that a previous request is not being processed using the loading variable, if it is then another request isn't started.
 2. Sets error to false, this is used later to tell the user if something is wrong for example the appwrite server could not be reached or the username or password was incorrect.
 3. Then the request is started, this is a promise so we use .then to process the result and .catch if something goes wrong.
 4. If everything is successful then we stop the loading and get the userdata.
 5. If an error occours we handle it and show a error to the user.

We also use onMount() to check if the user is already logged in on page load.

## Creating the Login Page design
With the logic in place we can now start working on the login pages design including the form, add the following code below the `<script>` you just added and not within it.

```svelte
<main>
  <div class="loginCore">
    {#if !userprofile}
      {#if !page}
        <div class="loginPage">
          <h1>Login</h1>
          {#if error}
            <p class="error">{error}</p>
          {/if}
          <form on:submit|preventDefault={login}>
            <input id="email" required placeholder="Email">
            <input type="password" id="password" required placeholder="Password">
            <button type="submit" disabled={loading}>{loading ? 'Please Wait' : 'Login'}</button>
          </form>
        </div>
      {:else}
        <div class="loginPage">
          <h1>Register</h1>
          {#if error}
            <p class="error">{error}</p>
          {/if}
          <!-- Create Registration code here -->
        </div>
      {/if}
      <p>
        {page ? 'Got an account?' : "Haven't got an account?"}
        <br>
        <span on:click={() => page = !page}>{page ? 'Login' : 'Sign Up'}</span>
      </p>
    {:else}
      <div class="loggedIn">
        <h2>Logged In!</h2>
        <h1>{userprofile.name}</h1>
        <p>{userprofile.email}</p>
        <p>ID: {userprofile.$id}</p>
        <button on:click={logout}>Logout</button>
      </div>
    {/if}
  </div>
</main>
```
### Code Explanation
(If you already know Svelte and understand this you can skip this section)

This weird type of HTML is Svelte's own superset of HTML which allows for JS to be embedded to create amazing web apps. I'll explain a few parts of this code.
<br>
```svelte
{#if !page}
```
This is a condition statement for Svelte and allows us to add or remove elements based off conditions. This one for example is used to tell if we want to see the register or sign up page.
<br>

```svelte
<p class="error">{error}</p>
```
`{}`in Svelte is similar to React's JSX Implementation and allows us to show variables from JS or run JS within the HTML. This one is used to display the error but later in the code you will see that I use this with a `?` operator to change text based off a variable.
<br>

```svelte
<form on:submit|preventDefault={login}>
```
`on:` is Svelte's way of binding events the `:preventDefault` section will preventDefault before running the login function when submit is called the event it sent to the previously written `login(event)` function.


## Adding some style to your login page 😎
If you want you can style this yourself, but for those who don't want to add the following code below the `</main>` section of your code, it's embedded CSS and will style your login form.


```svelte
<style>
  :global(body) {
    background: linear-gradient(90deg, rgba(209,0,176,1) 0%, rgba(0,249,255,1) 100%);
  }
  .loginCore {
    position: absolute;
    width: 300px;
    background-color: white;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
  }
  .loginCore span {
    color: rgb(0, 162, 255);
  }
  .loginCore span:hover {
    cursor: pointer;
  }
  .loginPage input {
    display: block;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .loggedIn {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .loggedIn h1 {
    margin: 0;
  }
  .loggedIn h2 {
    margin: 0;
  }
  .loggedIn p {
    margin: 10px;
  }
  .error {
    color: red;
  }
</style>
```
## What next?
Congratulations! You've just created a login page using Svelte and Appwrite! 🥳🥳🥳

If you noticed I left out the Register section for this tutorial and that was intentional. This is where I hand it off to you and allow you to use the techniques and ideas you used creating this project to add your own register page! The code to switch to the register page is already there you just need to add the form and create the functions to add it.

Add your Form code by replacing the section with:
```
<!-- Create Registration code here -->
```
Good Luck!
If you need any help feel free to join the [Discord](https://discord.gg/ZFwqr3S) or Refer to the [Appwrite Documentation](https://appwrite.io/docs).
TIP: [Checkout account create documentation for the web API](https://appwrite.io/docs/client/account#create)

(If you want to checkout the finished code is over on the [repository](https://github.com/PineappleIOnic/appwrite-svelte))

## Bonus
Some bonus tasks to improve the login page (To be added onto)

 - Add Regex Expressions for validating the Email

