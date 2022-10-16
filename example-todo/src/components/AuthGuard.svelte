<script>
  import Redirect from "./Redirect.svelte";
  import { user } from "../store/index";

  export let location;
</script>

{#if $user}
  <slot {...$$restProps} />
{:else}
  <Redirect to="/login" state={{ from: location }} />
{/if}
