<script lang="ts">
	import { Button, TextInput } from "@svelteuidev/core";
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
		} catch (err: any) {
			console.error(err.data);
		}
	}

	async function signOut() {
		pb.authStore.clear();
	}
</script>

{#if $currentUser}
	<p> Signed in as {$currentUser.username} </p>
	<Button on:click={signOut}>Sign out</Button>
{:else}
	<TextInput
		bind:value={username}
		placeholder="Username"
		type="text"
	/>

	<TextInput
		bind:value={password}
		placeholder="Password"
		type="password"
	/>

	<Button on:click={signUp}>Sign up</Button>
	<Button on:click={login}>Login</Button>
{/if}