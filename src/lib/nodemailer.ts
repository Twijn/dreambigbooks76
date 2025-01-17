import nodemailer from "nodemailer";

import { env } from "$env/dynamic/private";

const {
	NODEMAILER_HOST,
	NODEMAILER_PORT,
	NODEMAILER_USERNAME,
	NODEMAILER_PASSWORD,
} = env;

export const transporter = nodemailer.createTransport({
	host: NODEMAILER_HOST,
	port: NODEMAILER_PORT,
	secure: true,
	auth: {
		user: NODEMAILER_USERNAME,
		pass: NODEMAILER_PASSWORD,
	},
});

transporter.verify().then(() => {
	console.log("Connected to Gmail");
}, console.error);
