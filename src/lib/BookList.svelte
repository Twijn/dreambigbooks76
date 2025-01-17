<script lang="ts">
	import { books } from "./data/books.json";
</script>

<h2>Our Books</h2>

<div class="container">
	{#each books as book}
		<div class="book">
			<img src={book.image_url} alt="Book cover for {book.title}" />
			<div class="content">
				<h3>{book.title}</h3>
				<p>{book.description}</p>
				<p class="footer">{book.footer}</p>
				{#each book.purchase_urls as purchase_url}
					<a href={purchase_url.url} class="button" target="_blank">{purchase_url.name}</a>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	.book {
			display: flex;
			align-items: center;
	}

	.book img {
			margin-right: 1.4em;
			max-width: 100%;
			width: 200px;
			aspect-ratio: 1 / 1;
			border-radius: .2em;
			box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
	}

	@media only screen and (max-width: 750px) {
			.book {
					display: block;
					text-align: center;
			}

			.book .content {
					margin-top: .6em;
			}
	}
</style>
