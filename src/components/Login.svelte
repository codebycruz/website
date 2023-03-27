<script lang="ts">
	import { currentUser, pb } from "../lib/pocketbase";

	let username: string;
	let password: string;

	async function login() {
		await pb.collection("users")
			.authWithPassword(username, password);
	}

	async function signUp() {
		try {
			const _ = await pb.collection("users")
				.create({username, password, passwordConfirm: password});

			await login();
		} catch (err) {
			console.error(err.data);
		}
	}

	async function signOut() {
		pb.authStore.clear();
	}
</script>

{#if $currentUser}
	<p> Signed in as {$currentUser.username} </p>
	<button on:click={signOut}>Sign out</button>
{:else}
	<form on:submit|preventDefault>
		<input
			bind:value={username}
			placeholder="Username"
			type="text"
		/>
		<input
			bind:value={password}
			placeholder="Password"
			type="password"
		/>

		<button on:click={signUp}>Sign up</button>
		<button on:click={login}>Login</button>
	</form>
{/if}