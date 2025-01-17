<script lang="ts">
	import { biographies } from "./data/biography.json";
</script>

<div class="container">
	{#each biographies as biography}
		<div class="creator">
			<img src={biography.image_url} alt={biography.name}>
			<h3>{biography.name}</h3>
			<p class="job">{biography.job}</p>
			<p class="biography">{biography.biography.substring(0, 90)}...</p>
		</div>
	{/each}
</div>

<a href="/meet-the-creators" class="button button-center">Read more about us!</a>

<style>
	.container {
			display: grid;
			width: 100%;
			grid-template-columns: repeat(2, 1fr);
			gap: .5em;
	}

	.creator {
			display: block;
			text-align: center;
      background-color: var(--primary-background-color);
      padding: 1.2em;
			border-radius: .25em 1em;
			border-left: .2em solid var(--primary-contrast-color);
      box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
			transition: 250ms;
	}

	.creator:hover {
			box-shadow: 2px 2px 12px rgba(0,0,0,0.3);
	}

	.creator img {
			width: 100%;
			max-width: 200px;
			aspect-ratio: 1/1;
			border-radius: 50%;
			box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
	}

	.creator h3 {
			font-size: 2em;
			margin: 0;
	}

	.creator p {
			margin: 0;
	}

	.creator p.job {
			font-size: 1em;
			margin: .4em 0;
			opacity: .8;
	}

	.creator p.biography {
			position: relative;
			padding: .6em 1em .6em 1.8em;
			background-color: var(--secondary-background-color);
			border-radius: .15em .8em;
	}

	.creator p.biography::before {
			content: '\f7e7';
			position: absolute;
			top: 50%;
			left: .4em;
			transform: translateY(-50%);
			font-size: 1em;
      font-family: "Font Awesome 6 Pro";
			font-weight: 900;
			opacity: .6;
	}

	@media only screen and (max-width: 800px) {
			.container {
					display: block;
			}

			.creator {
					margin: 1em 0;
			}

			.container .creator p.biography {
					border-radius: .15em;
			}
	}
</style>
