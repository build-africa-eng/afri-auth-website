<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
</script>

<h1>AfriAuth Login</h1>
<button on:click={() => signIn("github", { callbackUrl: "/" })}>
  Sign in with GitHub
</button>