<script lang="ts">
	import Navbar from "../components/Navbar.svelte";
</script>

<Navbar/>
<slot />

<style lang="scss">
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>