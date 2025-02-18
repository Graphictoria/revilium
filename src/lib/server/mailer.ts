import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
import { SITE_NAME } from '$lib/config';

export let isReady = false;

const transporter = nodemailer.createTransport(
	{
		host: env.MAIL_HOST,
		port: 465,
		secure: true,
		auth: {
			user: env.MAIL_USERNAME,
			pass: env.MAIL_PASSWORD
		}
	},
	{ from: `"${SITE_NAME}" <${env.MAIL_USERNAME}>` }
);

transporter.verify((error) => {
	if (error) return;
	isReady = true;
});

interface SendMailOptions {
	to: string;
	subject: string;
	text: string;
	html: string;
}

export async function sendMail({ to, subject, text, html }: SendMailOptions) {
	return transporter.sendMail({
		to,
		subject,
		text,
		html
	});
}
