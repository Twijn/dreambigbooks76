<script lang="ts">
	import PageHeading from "$lib/PageHeading.svelte";
	import ContactSnippet from '$lib/ContactSnippet.svelte';

	import { biographies } from "$lib/data/biography.json";
</script>

<svelte:head>
	<title>Meet the Creators | Dream Big Books 76</title>
</svelte:head>

<PageHeading size="sm" />

<section class="bg">
	<div class="wrapper">
		<h1>Meet the Creators</h1>
		{#each biographies as biography}
			<div class="biography">
				<img src={biography.image_url} alt={biography.name}>
				<h2>{biography.name}</h2>
				<p class="job">{biography.job}</p>
				{@html biography.biography
					.split("\n")
					.map(x => `<p>${x}</p>`)
					.join("\n")
				}
			</div>
		{/each}
	</div>
</section>

<section>
	<div class="wrapper">
		<ContactSnippet glassBackgroundEnabled={true} imageSide="left" imageOption={0} />
	</div>
</section>

<style>
	.biography {
      margin: 2em 0;
			--image-width: 220px;
	}

	.biography img {
			display: inline;
			width: var(--image-width);
			height: var(--image-width);
			max-width: 100%;
			border-radius: 50%;
			margin: 1em 2em 0 0;
			float: left;
      box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
	}

	.job {
			font-size: 1.1em;
			font-style: italic;
			margin-top: -.6em;
			opacity: .7;
	}

	@media only screen and (max-width: 650px) {
			.biography {
					text-align: center;
			}
			.biography img {
					float: unset;
					margin: 0;
			}
	}
</style>
