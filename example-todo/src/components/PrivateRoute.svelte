<script>
  import { Route } from "svelte-routing";
  import AuthGuard from "./AuthGuard.svelte";

  export let path;
</script>

<Route {path} let:location>
  <AuthGuard {...$$slots} {location}>
    <slot />
  </AuthGuard>
</Route>
