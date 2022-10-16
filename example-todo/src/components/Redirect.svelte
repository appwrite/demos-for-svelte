<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  export let to;
  export let state;

  onMount(() => {
    navigate(to, { replace: true, state });
  });
</script>
