<script>
  import { Router, Route, navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import SignUp from "./pages/SignUp.svelte";
  import Login from "./pages/Login.svelte";
  import Home from "./pages/Home.svelte";
  import PrivateRoute from "./components/PrivateRoute.svelte";
  import { user } from "./store/index";
  import api from "./api/index";
  import "./style/index.css"


  export let url = "";
  let isLoading = true;

 async function fetchAccount(){
    const account = await api.getAccount();
    user.update(() => account);
    navigate("/");
  }


  onMount(async () => {
    if(!$user){
      fetchAccount()
    }
    else{
      navigate("/login");
    }
  });

  isLoading = false;

</script>

<main>

  <Router {url}>
    <div class="container-fluid px-0">
      {#if isLoading}
        <div class="row min-vh-100 justify-content-center align-items-center">
          <div class="spinner-border text-center" role="status" />
        </div>
      {:else}
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} /> 
        <PrivateRoute path="/"  >
           <Home />
        </PrivateRoute>
  
      {/if}
    </div>
  </Router>

</main>

