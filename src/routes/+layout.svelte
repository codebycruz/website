<script lang="ts">
	import Navbar from "../components/Navbar.svelte";
	import Footer from "../components/Footer.svelte";
</script>

<Navbar />
<slot />
<Footer />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>