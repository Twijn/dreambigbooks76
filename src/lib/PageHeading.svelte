<script lang="ts">
	let { size }: {size: "sm"|"lg"} = $props();
</script>

<section class="heading heading-{size}">
	<div class="wrapper">
		<img src="/images/dreambb_logo.webp" alt="Dream Big Books 76 Logo" />
	</div>
</section>

<style>
    section.heading-sm {
        padding: 1em;
    }

    section.heading-lg {
        padding: 5em 1em;
    }

		img {
				display: block;
        width: 100%;
				max-width: 420px;
				margin: 0 auto;
				border-radius: .15em;
		}

		section.heading-sm img {
				max-width: 360px;
		}
</style>
