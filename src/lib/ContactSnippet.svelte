<script lang="ts">
	const IMAGE_OPTIONS = [
		{
			src: "/images/supplement/horse-parade-414x434.webp",
			alt: "Horse Parade Pastel Drawing",
		},
		{
			src: "/images/supplement/horse-and-cannon-600x434.webp",
			alt: "Horse and Cannon Pastel Drawing",
		},
	];

	let {
		glassBackgroundEnabled,
		imageSide,
		imageOption,
	}: {
		glassBackgroundEnabled: boolean,
		imageSide: "left"|"right"|"none",
		imageOption: 0|1,
	} = $props();

	const image = IMAGE_OPTIONS[imageOption];
</script>

<div class="container">
	{#if imageSide === "left"}
		<img src={image.src} alt={image.alt} class="left" />
	{/if}
	<div class={glassBackgroundEnabled ? 'section glass-bg' : 'section'}>
		<h2>Contact Us</h2>
		<p>
			Looking to get in contact with us? Click below to see how to get in touch!
			<a class="button" href="/contact">Visit our contact us form!</a>
		</p>
	</div>
	{#if imageSide === "right"}
		<img src={image.src} alt={image.alt} class="right" />
	{/if}
</div>

<style>
		.container {
				display: flex;
				align-items: center;
		}

		.container .section {
				flex-grow: 1;
		}

		img {
				border-radius: 1em;
				height: 250px;
				border-left: .2em solid var(--primary-contrast-color);
				box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
		}

		img.right {
				margin-left: 1em;
		}

		img.left {
				margin-right: 1.6em;
		}

		.glass-bg {
				padding: 1.2em 1.6em;
				border-radius: 1em;
		}

		@media only screen and (max-width: 800px) {
				.container {
						display: block;
						text-align: center;
				}

        img.right {
            margin: 1.4em 0 0 0;
        }

				img.left {
            margin: 0 0 1.4em 0;
				}
		}
</style>
