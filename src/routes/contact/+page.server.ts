import { fail } from '@sveltejs/kit';

import { env } from "$env/dynamic/private";
import * as penv from "$env/dynamic/public";

import { transporter } from '$lib/nodemailer';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// time before a user can use the same email address
const REPEAT_TIMEOUT = 60 * 60 * 1000;
const history: {email: string, timestamp: number}[] = [];

const sendEmail = (email: string, subject: string, body: string) => {
	// Add additional context to the subject and body
	subject = `Contact Form Submission: ${subject}`;
	body = `The following message was sent from the contact form at https://dreambigbooks76.com/contact:\n\n\t${body.split("\n").join("\n\t")}\n\nReply address: ${email}. To reply, respond to this email!`;

	return new Promise((resolve, reject) => {
		transporter.sendMail({
			from: `"Dream Big Books 76" <${env.NODEMAILER_FROMADDRESS}>`,
			to: penv.env.PUBLIC_EMAIL_ADDRESS,
			subject,
			text: body,
			replyTo: email,
		}, (err, info) => {
			if (err) {
				reject(err);
			} else {
				resolve(info);
			}
		});
	});
}

export const actions = {
	default: async ({ request, fetch }) => {
		if (penv.env.PUBLIC_CONTACT_ENABLED.toLowerCase() !== "true") {
			return fail(500, { error: "Sorry! The contact form is currently disabled. Please reach out to us directly using the link above."});
		}

		const formData = await request.formData();

		const email = formData.get("email");
		const subject = formData.get("subject");
		const body = formData.get("body");
		const response = formData.get("g-recaptcha-response");

		if (typeof email !== "string" || email.length > 100 || !email.match(EMAIL_REGEX)) {
			return fail(400, {email, subject, body, error: "Email format is incorrect or is over 100 characters!"});
		}

		if (typeof subject !== "string" || subject.length < 9 || subject.length > 100) {
			return fail(400, {email, subject, body, error: "Subject length must be between 10 and 100 characters!"});
		}

		if (typeof body !== "string" || body.length < 9 || body.length > 2000) {
			return fail(400, {email, subject, body, error: "Body length must be between 10 and 2000 characters!"});
		}

		if (typeof response !== "string") {
			return fail(400, {email, subject, body, error: "Missing reCAPTCHA! Try sending your request again, or email us directly at the link above."});
		}

		console.log(history)

		const foundHistory = history.find(x =>
			x.email === email.toLowerCase() &&
			x.timestamp + REPEAT_TIMEOUT > Date.now());

		if (foundHistory) {
			return fail(400, {error: "You've already submitted a contact request recently! We'll get back to you as soon as possible!"});
		}

		const recaptchaData = await fetch("https://www.google.com/recaptcha/api/siteverify", {
			method: "POST",
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				secret: env.RECAPTCHA_SECRET_KEY,
				response,
			}),
		});

		const data = await recaptchaData.json();

		if (!data.success) {
			console.log(data["error-codes"]);
			return fail(400, {email, subject, body, error: "Failed verifying reCAPTCHA! Try sending your request again, or email us directly at the link above."})
		}

		console.log(`Sending email for contact entry:
Email: ${email}
Subject: ${subject}
Body: ${body}`);

		try {
			await sendEmail(email, subject, body);
			console.log("Message sent successfully!");
			history.push({
				email: email.toLowerCase(),
				timestamp: Date.now(),
			});
			return { success: true };
		} catch(err) {
			console.log("Failed to send message:")
			console.error(err);
			return fail(500, {email, subject, body, error: "Failed to send message! Please try again later or send us a message directly by clicking the link above."});
		}
	},
};
