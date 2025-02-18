import type { User } from '@prisma/client';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import prisma from './prisma';

interface Tokens {
	accessToken: string;
	refreshToken: string;
}

export interface AccessTokenData {
	id: number;
}

export interface RefreshTokenData extends AccessTokenData {
	passedMfa: boolean;
	version: number;
}

interface VerificationResult extends AccessTokenData {
	tokens?: Tokens;
}

export class JWTValidationError extends Error {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
	}
}

export class JWTMFAError extends Error {
	public data: RefreshTokenData;

	constructor(message: string, data: RefreshTokenData, options?: ErrorOptions) {
		super(message, options);

		this.data = data;
	}
}

export function createUserTokens(
	user: { id: number; otpSecret?: string | null; jwtVersion: number },
	passedMfa?: boolean
): Tokens {
	const refreshToken = jwt.sign(
		{
			id: user.id,
			passedMfa: passedMfa || !Boolean(user.otpSecret),
			version: user.jwtVersion
		},
		env.JWT_REFRESH_SECRET,
		{ expiresIn: '30d' }
	);

	const accessToken = jwt.sign(
		{
			id: user.id
		},
		env.JWT_ACCESS_SECRET,
		{ expiresIn: '15min' }
	);

	return { refreshToken, accessToken };
}

export async function verifyUserTokens(tokens: {
	accessToken: string;
	refreshToken: string;
}): Promise<VerificationResult> {
	if (!tokens || !tokens?.refreshToken) throw new JWTValidationError('Missing JWTs.');

	let accessTokenData;
	try {
		accessTokenData = jwt.verify(tokens.accessToken, env.JWT_ACCESS_SECRET) as AccessTokenData;
	} catch (e) {}

	let refreshTokenData;
	try {
		refreshTokenData = jwt.verify(tokens.refreshToken, env.JWT_REFRESH_SECRET) as RefreshTokenData;
	} catch (e) {}

	if (refreshTokenData) {
		if (!refreshTokenData.passedMfa) {
			throw new JWTMFAError('Refresh token requires MFA.', refreshTokenData);
		}
	} else {
		throw new JWTValidationError('Invalid refresh token at refresh token read.');
	}

	if (accessTokenData) {
		return accessTokenData;
	} else {
		const user = await prisma.user.findFirst({
			where: { id: refreshTokenData.id },
			select: { id: true, jwtVersion: true, otpSecret: true }
		});
		if (!user || user.jwtVersion !== refreshTokenData.version) {
			throw new JWTValidationError('Invalid refresh token at version step.');
		}

		const newTokens = createUserTokens(user, refreshTokenData.passedMfa);
		return {
			id: user.id,
			tokens: newTokens
		};
	}
}
