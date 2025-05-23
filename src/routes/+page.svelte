<script>
  import { signOut } from '@auth/sveltekit/client';
  export let data;
</script>

{#if data.session}
  <h1>Welcome, {data.session.user.name}</h1>
  <h2>Users</h2>
  <ul>
    {#each data.users as user}
      <li>{user.email}</li>
    {/each}
  </ul>
  <button on:click={() => signOut({ callbackUrl: '/login' })}>
    Sign out
  </button>
{:else}
  <h1>Afri Auth</h1>
  <a href="/login">Login</a>
{/if}
