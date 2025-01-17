<script lang="ts">
	import PageHeading from "$lib/PageHeading.svelte";
	import BookList from "$lib/BookList.svelte";
	import AboutCards from '$lib/AboutCards.svelte';
	import ContactSnippet from '$lib/ContactSnippet.svelte';
</script>

<svelte:head>
	<title>Home | Dream Big Books 76</title>
</svelte:head>

<PageHeading size="lg" />

<section class="bg">
	<div class="wrapper">
		<BookList />
	</div>
</section>

<section>
	<div class="wrapper">
		<h2 class="glass-bg">Meet the Creators</h2>
		<AboutCards />
	</div>
</section>

<section class="bg">
	<div class="wrapper">
		<ContactSnippet glassBackgroundEnabled={false} imageSide="right" imageOption={0} />
	</div>
</section>
