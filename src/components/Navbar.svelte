<script lang="ts">
	import Icon from "@iconify/svelte";

	let width: number;
</script>

<svelte:window bind:innerWidth={width} />

<div class="navbar">
	<div class="logo">
		bycruz
	</div>

	{#if width <= 700}
		<div>🚧</div>
	{:else}
		<div class="sep" />

		<div>
			<a href="/">Home</a>
		</div>

		<div class="active">
			<a href="/projects">Projects</a>
		</div>

		<div>
			<a href="/resume">Resume</a>
		</div>
	{/if}
</div>

<style lang="scss">
	@use "sass:math";

	$nav-bg: #363BAC;

	$nav-font: "Inter";
	$nav-font-size: 40px; // 4vh

	$nav-height: 112px; // 112 / 1024 = ~10vh

	$nav-sep: #31358B;
	$nav-sep-height: 70px; // 2vh
	$nav-sep-width: 12px; // 0.5vw

	$nav-inactive: rgba(255, 255, 255, 1);
	$nav-active: rgba(255, 255, 255, 0.5);

	div.navbar {
		height: $nav-height;
		background-color: $nav-bg;

		font-family: $nav-font;
		font-size: $nav-font-size;

		display: flex;
		flex-direction: row;
		align-items: center; // Center height

		div {
			margin-right: 3vw;
			color: $nav-inactive;

			a {
				text-decoration: none;
				color: $nav-inactive;
			}

			&.active a {
				color: $nav-active;
			}

			&.sep {
				background-color: $nav-sep;

				width: $nav-sep-width;
				height: $nav-sep-height;
			}

			&.logo { // todo: left padding here should be &::before
				padding-left: 5vw; // 71/1440 = ~5 vw
				padding-right: 5vw;
			}
		}
	}
</style>