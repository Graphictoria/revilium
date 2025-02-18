import { hash } from 'bcrypt';
import { randomBytes } from 'node:crypto';
// @ts-ignore
import base32 from 'thirty-two';
import { totp } from 'notp';
import {
	SITE_NAME,
	OTP_BACKUPS,
	OTP_BACKUP_PARTS,
	OTP_BACKUP_PART_CHARACTERS,
	OTP_BACKUP_PART_LENGTH
} from '../config.js';

function generateBackupPart() {
	let part = '';

	for (let i = 0; i < OTP_BACKUP_PART_LENGTH; i++) {
		part += OTP_BACKUP_PART_CHARACTERS.charAt(
			Math.floor(Math.random() * OTP_BACKUP_PART_CHARACTERS.length)
		);
	}

	return part;
}

function generateBackupCode() {
	let parts = [];

	for (let i = 0; i < OTP_BACKUP_PARTS; i++) {
		parts.push(generateBackupPart());
	}

	return parts.join('-');
}

export function generateSecret() {
	const bytes = randomBytes(8).toString('hex');
	const secret = base32.encode(bytes);
	const googleSecret = secret.toString().replace(/=/g, '');

	return googleSecret;
}

export function validateToken(token: number | string, secret: string) {
	const decoded = base32.decode(secret);
	return totp.verify(token.toString(), decoded);
}

export function generateURI(username: string, secret: string) {
	return `otpauth://totp/${SITE_NAME}:${username}?secret=${secret}&issuer=${SITE_NAME}`;
}

export async function generateBackupCodes() {
	let codes = [];
	let hashes = [];

	for (let i = 0; i < OTP_BACKUPS; i++) {
		codes.push(generateBackupCode());
	}

	for (let i = 0; i < codes.length; i++) {
		let code = codes[i];
		hashes.push(await hash(code, 10));
	}

	return { codes, hashes };
}
