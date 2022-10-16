<script>
  import api from "../api/index";
  import { user } from "../store/index";
  import { navigate, Link } from "svelte-routing";

  export let location;
  let errors = {
    email: "",
    password: "",
    common: "",
  };
  const signupData = {
    name: "",
    email: "",
    password: "",
  };
  let { from } = location.state || { from: { pathname: "/" } };

  async function handleSubmit() {
    try {
      const account = await api.createAccount(
        signupData.email,
        signupData.password,
        signupData.name
      );
      await api.createEmailSession(signupData.email, signupData.password);
      user.update(() => account);
      navigate(from.pathname, { replace: true });
    } catch (error) {}
  }
</script>

<div class="circle" />
<form class="form" on:submit|preventDefault={handleSubmit}>
  <h2 class="form__title">SignUp</h2>
  <div class="form__container">
    <div class="form__group">
      <input
        type="text"
        id="name"
        bind:value={signupData.name}
        class="form__input"
        placeholder=" "
      />
      <label for="name" class="form__label">Name:</label>
      <span class="form__line" />
    </div>
    <div class="form__group">
      <input
        type="text"
        id="email"
        bind:value={signupData.email}
        class="form__input"
        placeholder=" "
      />
      <label for="email" class="form__label">Email:</label>
      <span class="form__line" />
    </div>
    <div class="form__group">
      <input
        type="password"
        id="password"
        class="form__input"
        placeholder=" "
        bind:value={signupData.password}
      />
      <label for="password" class="form__label">Password:</label>
      <span class="form__line" />
    </div>
    {#if errors.common}
      <div class="text-danger">{errors.common}</div>
    {/if}
    <input type="submit" class="form__submit" value="SignUp" />
    <Link to="/login"><a href={"#"}>Login</a></Link>
  </div>
</form>
