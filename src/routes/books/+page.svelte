<script lang="ts">
	import BookList from "$lib/BookList.svelte";
	import PageHeading from '$lib/PageHeading.svelte';
	import ContactSnippet from '$lib/ContactSnippet.svelte';
</script>

<svelte:head>
	<title>Our Books | Dream Big Books 76</title>
	<meta name="description" content="View all books published from Dream Big Books 76." />
</svelte:head>

<PageHeading size="sm" />

<section class="bg">
	<div class="wrapper">
		<BookList />
	</div>
</section>

<section>
	<div class="wrapper">
		<ContactSnippet glassBackgroundEnabled={true} imageSide="right" imageOption={1} />
	</div>
</section>
