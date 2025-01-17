<script lang="ts">
	import '../app.css';
	import '$lib/button.css';
	import { page } from "$app/state";
	import { onMount } from 'svelte';

	import { env } from "$env/dynamic/public";
	const { PUBLIC_RECAPTCHA_SITE_KEY } = env;

	const { children } = $props();

	onMount(() => {
		if (!window.grecaptcha) {
			const script = document.createElement('script');
			script.src = `https://www.google.com/recaptcha/api.js?render=${PUBLIC_RECAPTCHA_SITE_KEY}`;
			script.async = true;
			script.defer = true;
			document.body.appendChild(script);
		}
	});

	let mobileNavOpen = $state(false);

	const closeMobileNav = (e) => {
		let target = e.target;

		while (target) {
			if (target.id && target.id === "open-mobile-nav") {
				return;
			}
			target = target.parentElement;
		}

		mobileNavOpen = false;
	}
</script>

<svelte:document onclick={closeMobileNav} />

<div class="app">
	<header>
		<a href="/" class="nav-heading">Dream Big Books 76</a>
		<nav class={mobileNavOpen ? "mobile-open" : undefined}>
			<ul>
				<li>
					<a href="/" aria-current={page.url.pathname === "/" ? "page" : undefined}>Home</a>
				</li>
				<li>
					<a href="/books" aria-current={page.url.pathname.startsWith("/book") ? "page" : undefined}>Our Books</a>
				</li>
				<li>
					<a href="/meet-the-creators" aria-current={page.url.pathname === "/meet-the-creators" ? "page" : undefined}>Meet the Creators</a>
				</li>
				<li>
					<a href="/contact" aria-current={page.url.pathname === "/contact" ? "page" : undefined}>Contact</a>
				</li>
				<li>
					<a href="https://store.dreambigbooks76.com" target="_blank" class="cta button">Visit our Store</a>
				</li>
			</ul>
		</nav>
		<button id="open-mobile-nav" aria-label="Open mobile menu" onclick={() => mobileNavOpen = !mobileNavOpen}><i class="fa-solid fa-bars"></i></button>
	</header>
	<main>
		{@render children()}
	</main>
	<footer>
		<p>
			<a href="/">Dream Big Books 76</a>
		</p>
		<p>
			<a href="/books">Our Books</a>
			&bullet;
			<a href="/meet-the-creators">Meet the Creators</a>
			&bullet;
			<a href="/contact">Contact</a>
			&bullet;
			<a href="https://store.dreambigbooks76.com" target="_blank">Our Store</a>
		</p>
	</footer>
</div>

<style>
	.nav-heading {
			font-family: "IFDW Uppercase", sans-serif;
			font-size: 1.8em;
	}

	header, footer {
			box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
	}

	header {
      display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: var(--primary-background-color);
			height: 3.5em;
			padding: 0 1em;
			border-bottom: .2em solid var(--primary-contrast-color);
	}

	header nav ul {
      display: flex;
			list-style-type: none;
			margin: 0;
			padding: 0;
	}

	header nav ul a {
			display: block;
			padding: .4em .8em;
			font-family: "IFDW Regular", serif;
			font-size: 1.2em;
	}

	header nav ul a[aria-current=page],
	header nav ul a:hover,
	header nav ul a:focus-visible {
			text-decoration: underline;
	}

	header nav ul a.cta {
			border-radius: .25em;
			margin: 0;
	}

  a {
      text-decoration: none;
  }

	.app {
			display: flex;
			flex-direction: column;
	}

	main {
			flex-grow: 1;
	}

	header, main, footer {
			flex-shrink: 0;
	}

	footer {
			background-color: var(--primary-background-color);
			text-align: center;
			padding: 1em 0;
			border-top: .2em solid var(--secondary-theme-color);
	}

	footer p {
			margin: .2em 0;
	}

	#open-mobile-nav {
			display: none;
			background-color: transparent;
			color: var(--primary-theme-color);
			border: none;
			position: relative;
			font-size: 1.8em;
			width: 3.5rem;
			height: 3.5rem;
      padding: 0;
			margin: 0;
			border-radius: 0;
			text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
			transition: 250ms;
			cursor: pointer;
	}

	#open-mobile-nav:hover,
	#open-mobile-nav:focus-visible {
			color: var(--secondary-theme-color);
      text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
	}

	#open-mobile-nav i {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
	}

	@media only screen and (max-width: 1000px) {
			#open-mobile-nav {
					display: block;
			}

			header nav ul {
					position: absolute;
					top: 4.3em;
					right: .6em;
					display: block;
					width: calc(100% - 1.2em);
					max-width: 20em;
          background-color: var(--secondary-background-color);
          box-shadow: 2px 2px 12px rgba(0,0,0,0.4);
					border-right: .2em solid var(--primary-contrast-color);
					border-radius: .3em;
					overflow: hidden;
          visibility: hidden;
          opacity: 0;
					transform: scale(.9);
          transition: 250ms;
			}

			header nav ul a {
					text-align: left;
					border-radius: 0 !important;
					padding: .8em 1.2em;
			}

			header nav.mobile-open ul {
					visibility: visible;
					opacity: 1;
					transform: scale(1);
			}
	}
</style>
