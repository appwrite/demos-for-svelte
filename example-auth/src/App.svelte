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

	const register = async (event) => {
  		if (loading) { return }

		error = false;

		// Password confirmation
		if (event.target.password.value !== event.target.confirmPassword.value) {
			error = 'Error: Passwords must be matching.';
			return;
		}


		// Length Validation
		if (!(event.target.password.value.length >= 6 && event.target.password.value.length <= 32)) {
			error = 'Error: Password must be between 6 and 32 characters.';
			return;
		}

		if (event.target.username.value.length >= 100) {
			error = 'Error: Username can not exceed 100 characters';
			return;
		}

		// Email validation
		const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailRegex.test(event.target.email.value)) {
			error = 'Error: Invalid Email';
			return;
		}

		loading = true;

		await appwrite.account.create(event.target.email.value, event.target.password.value, event.target.username.value);
		await appwrite.account.createSession(event.target.email.value, event.target.password.value);		
	}
</script>

<main>
  <div class="loginCore">
    {#if !userprofile}
    {#if (!page)}
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
    <div  class="loginPage">
      <h1>Register</h1>
      {#if error}
      	<p class="error">{error}</p>
      {/if}
      <form on:submit|preventDefault={register}>
        <input id="username" required placeholder="Username">
        <input id="email" required placeholder="Email">
        <input type="password" id="password" required placeholder="Password">
        <input type="password" id="confirmPassword" required placeholder="Confirm Password">
        <button type="submit" disabled={loading}>{loading ? 'Please Wait' : 'Register'}</button>
      </form>
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
