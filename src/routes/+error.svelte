<script lang="ts">
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

	let visible: boolean;
	onMount(() => visible = true);
</script>

<div class="error">
	<h1>¯\_(ツ)_/¯</h1>

	{#if visible}
		<p in:fly={{ delay: 1 }}>
			Couldn't find this page.
		</p>
	{/if}
</div>

<style lang="scss">
	div.error {
		font-family: Inter;

		display: flex;
		flex-direction: column;
		align-items: center;

		p {
			color: #606060;
		}
	}
</style>