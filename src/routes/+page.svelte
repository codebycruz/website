<script lang="ts">
	import { onMount } from "svelte"
	import { fade } from "svelte/transition";
	import Login from "../components/Login.svelte";

	const messages = [ "Bonjour!", "Hey!", "¿Qué tal?", "Guten Tag!" ]
	let msg = Math.floor(Math.random() * messages.length);

	let text = messages[msg];

	function shuffleHello() {
		msg = (msg + 1) % messages.length;
		text = messages[msg];
	}

	setInterval(shuffleHello, 8000);

	let ready: boolean;
	onMount(() => ready = true);
</script>

<div class="home">
	{#if ready}
		{#key text}
			<h1 in:fade={ { duration: 2000 } }>
				{text}
			</h1>
		{/key}

		<h2 in:fade>
			This is my web page.
		</h2>
	{/if}
</div>

<style lang="scss">
	$header-font: "Inter";

	div.home {
		display: block;

		height: 80vh; // Navbar and footer take 10% of space each.

		h1, h2 {
			font-family: $header-font;
			text-align: center;
		}
	}
</style>
