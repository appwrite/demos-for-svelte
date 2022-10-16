<script>
  import api from "../api/index";
  import { navigate, Link } from "svelte-routing";
  import { user } from "../store/index";

  export let location;

  let errors = {
    email: "",
    password: "",
    common: "",
  };
  const loginData = {
    email: "",
    password: "",
  };
  let { from } = location.state || { from: { pathname: "/" } };

  async function handleSubmit() {
    try {
      await api.createSession(loginData.email, loginData.password);
      const account = await api.getAccount();
      user.update(() => account);
      navigate(from.pathname, { replace: true });
    } catch (error) {}
  }
</script>

<div class="circle" />
<form class="form" on:submit|preventDefault={handleSubmit}>
  <h2 class="form__title">Login</h2>
  <div class="form__container">
    <div class="form__group">
      <input
        type="text"
        id="email"
        bind:value={loginData.email}
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
        bind:value={loginData.password}
      />
      <label for="password" class="form__label">Password:</label>
      <span class="form__line" />
    </div>
    {#if errors.common}
      <div class="text-danger">{errors.common}</div>
    {/if}
    <input type="submit" class="form__submit" value="LOG IN" />
    <Link to="/signup"><a href={"#"}>Sgin UP</a></Link>
  </div>
</form>
