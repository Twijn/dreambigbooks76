<script lang="ts">
	import type { ActionData } from "./$types";
	import "$lib/form.css";
	import "$lib/alert.css";

	import { browser } from "$app/environment";

	import { env } from "$env/dynamic/public";
	import PageHeading from '$lib/PageHeading.svelte';
	const { PUBLIC_RECAPTCHA_SITE_KEY, PUBLIC_EMAIL_ADDRESS, PUBLIC_CONTACT_ENABLED } = env;

	const { form }: { form: ActionData } = $props();

	const enabled = PUBLIC_CONTACT_ENABLED.toLowerCase() === "true";

	function onSubmit(token) {
		document.getElementById("contact-us")?.submit();
	}

	if (browser) {
		window.onSubmit = onSubmit;
	}
</script>

<svelte:head>
	<title>Contact | Dream Big Books 76</title>
	<meta name="description" content="Contact page & from for Dream Big Books 76" />
</svelte:head>

<PageHeading size="sm" />

<section class="bg">
	<div class="wrapper">
		<h1>Contact</h1>

		<p>
			Looking to get in contact with us? Fill out the form below or
			<a href="mailto:{PUBLIC_EMAIL_ADDRESS}">send us an email</a>
			and we'll get back to you as soon as possible!
		</p>

		{#if enabled}
			<form id="contact-us" method="POST">
				{#if form?.success}
					<div class="alert alert-success">
						<strong>Success!</strong>
						Your message was sent successfully! We'll be in contact as soon as possible.
					</div>
				{:else if form?.error}
					<div class="alert alert-danger">
						<strong>An error occurred!</strong>
						{form.error}
					</div>
				{/if}
				<label>
					Email
					<input type="email" name="email" maxlength="100" required value={form?.email ?? ""} placeholder={PUBLIC_EMAIL_ADDRESS} />
				</label>
				<label>
					Subject
					<input type="text" name="subject" minlength="10" maxlength="100" required value={form?.subject ?? ""} />
				</label>
				<label>
					Body
					<textarea name="body" rows="10" minlength="10" maxlength="2000" required>{form?.body ?? ""}</textarea>
				</label>
				<p class="recaptcha-notice">
					This site is protected by reCAPTCHA and the Google
					<a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a> and
					<a href="https://policies.google.com/terms" target="_blank">Terms of Service</a> apply.
				</p>
				<button
					class="button g-recaptcha"
					data-sitekey={PUBLIC_RECAPTCHA_SITE_KEY}
					data-callback="onSubmit"
					data-action="submit"
					type="submit">Send us a Message!</button>
			</form>
		{:else}
			<div class="alert alert-danger">
				<strong>Sorry!</strong>
				This form is currently disabled. Please contact us using the link above, or send an email to {PUBLIC_EMAIL_ADDRESS}.
			</div>
		{/if}
	</div>
</section>

<style>
	.recaptcha-notice {
			margin-top: -.4em;
			font-size: .8em;
			opacity: .8;
	}
</style>
