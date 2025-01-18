<script lang="ts">
	import PageHeading from '$lib/PageHeading.svelte';
	import ContactSnippet from '$lib/ContactSnippet.svelte';

	const { data } = $props();
	const { book } = data;
</script>

<svelte:head>
	<title>{book.title} | Dream Big Books 76</title>
	<meta name="description" content={book.description} />
</svelte:head>

<PageHeading />

<section class="bg">
	<div class="container wrapper">
		<div class="left">
			<h1>{book.title}</h1>
			<p>{book.description}</p>
			<p>{book.footer}</p>
			<div class="purchase">
				{#each book.purchase_urls as site}
					<a href={site.url} class="button" target="_blank">{site.name}</a>
				{/each}
			</div>
		</div>
		<div class="right">
			<img src={book.image_url} alt="Book cover for {book.title}" />
		</div>
	</div>
</section>

<section>
	<div class="wrapper">
		<ContactSnippet glassBackgroundEnabled={true} />
	</div>
</section>

<style>
	.container {
			display: grid;
			grid-template-columns: 1fr 250px;
			gap: 1em;
	}
</style>
