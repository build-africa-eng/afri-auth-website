<script>
  import { signIn } from '@auth/sveltekit/client';
</script>

<h1>Afri Auth - Login</h1>
<button on:click={() => signIn('github', { callbackUrl: '/' })}>
  Sign in with GitHub
</button>
