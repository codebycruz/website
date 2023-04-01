<script lang="ts">
	import Icon from "@iconify/svelte";
</script>

<div class="navbar">
	<ul>
		<li class="logo">
			codebycruz
		</li>

		<li class="sep" />

		<li class="active">
			<a href="/">Home</a>
		</li>

		<li>
			<a href="/">Projects</a>
		</li>

		<li>
			<a href="/">Resume</a>
		</li>
	</ul>
</div>

<style lang="scss">
	@use "sass:math";

	$nav-bg: #363BAC;

	$nav-font: "Inter";
	$nav-font-size: 4vh;

	$nav-height: 10vh; // 112 / 1024 = ~10vh

	$nav-sep: #31358B;
	$nav-sep-height: 2vh;
	$nav-sep-width: 0.5vw;

	$nav-inactive: rgba(255, 255, 255, 1);
	$nav-active: rgba(255, 255, 255, 0.5);

	div.navbar {
		height: $nav-height;
		background-color: $nav-bg;

		font-family: $nav-font;
		font-size: $nav-font-size;

		overflow-x: hidden;

		ul {
			padding: 0;
			margin: 0;

			li {
				display: inline-block;

				// Todo: Should probably use margin, not padding.
				padding-top: math.div($nav-height, 2) - math.div($nav-font-size, 2);
				margin-right: 3vw; // 53 / 1440 = ~3 vw

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

					position: relative; // Move halfway downward so it is 2vh tall both up and down
					top: math.div($nav-sep-height, 2);
				}

				&.logo {
					padding-left: 5vw; // 71/1440 = ~5 vw
					padding-right: 5vw;

					color: $nav-inactive;
				}
			}
		}
	}
</style>