import { Request, Response } from "express";
import HttpError from "../../errors/httpError";
import { TokenResponse, KeycloakError } from "../../types";
import { getAdminToken, searchUser } from "./functions";
import jwt, { JwtPayload } from "jsonwebtoken";
import { loginValidation, registerValidation } from "./validation";


export const register = async (req: Request, res: Response): Promise<Response> => {
	const data = await registerValidation.validateAsync(req.body, { abortEarly: false });
	const { email, password, firstName, lastName } = data;

	const adminToken = await getAdminToken();

	// Register the user
	const registerResponse = await fetch(
		`${process.env.KEYCLOAK_SERVER_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${adminToken}`,
			},
			body: JSON.stringify({
				email,
				firstName,
				lastName,
				enabled: true,
				credentials: [{ type: 'password', value: password, temporary: false }],
			}),
		}
	);

	if (!registerResponse.ok) {
		const error = await registerResponse.json() as KeycloakError;
		throw new HttpError(error.error, 400, true);
	}

	const userData = await searchUser(adminToken, email);

	// Return success response with user data
	return res.status(201).json({
		id: userData.id,
		email: userData.email,
		username: userData.username,
		firstName: userData.firstName,
		lastName: userData.lastName,
	});

};

export const login = async (req: Request, res: Response): Promise<Response> => {
	const data = await loginValidation.validateAsync(req.body, { abortEarly: false });

	const response = await fetch(`${process.env.KEYCLOAK_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'password',
			client_id: process.env.KEYCLOAK_CLIENT_ID!,
			username: data.email,
			password: data.password,
		}),
	});

	if (!response.ok) {
		const error = await response.json() as KeycloakError;
		throw new HttpError(error.error_description || 'Login failed', 400, true);
	}

	const tokenData = await response.json() as TokenResponse;
	const decoded = jwt.decode(tokenData.access_token) as JwtPayload;

	res.cookie(process.env.COOKIE_KEY!, tokenData.access_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
		priority: "high",
		expires: new Date(Date.now() + 4.5 * 60 * 1000) // as the token expires in 5 minutes
	});

	res.cookie(process.env.REFRESH_KEY!, tokenData.refresh_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
		priority: "high",
		expires: new Date(Date.now() + 29.5 * 60 * 1000) // refresh token expires in 30 minutes
	});

	return res.status(200).json({
		sid: decoded?.sid,
		email: decoded?.email,
		name: decoded?.name,
	});

};

export const me = async (req: Request, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	return res.status(200).json(req.user);
};

export const refreshToken = async (req: Request, res: Response): Promise<Response> => {
	const refreshToken = req.cookies[process.env.REFRESH_KEY!];

	if (!refreshToken) {
		throw new HttpError('Refresh token not provided', 401, true);
	}

	const response = await fetch(`${process.env.KEYCLOAK_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			client_id: process.env.KEYCLOAK_CLIENT_ID!,
			refresh_token: refreshToken,
		}),
	});

	if (!response.ok) {
		const error = await response.json() as KeycloakError;
		throw new HttpError(error.error_description || 'Token refresh failed', 400, true);
	}

	const tokenData = await response.json() as TokenResponse;

	res.cookie(process.env.COOKIE_KEY!, tokenData.access_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
		priority: "high",
		expires: new Date(Date.now() + 4.5 * 60 * 1000) // access token expires in 5 minutes
	});

	res.cookie(process.env.REFRESH_KEY!, tokenData.refresh_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
		priority: "high",
		expires: new Date(Date.now() + 29.5 * 60 * 1000) // refresh token expires in 30 minutes
	});

	return res.status(200).json({ message: 'Ok' });
};

export const logout = async (req: Request, res: Response) => {
	const refreshToken = req.cookies[process.env.REFRESH_KEY!];

	if (!refreshToken) {
		return res.status(401).json({ message: 'Refresh token not provided' });
	}

	await fetch(`${process.env.KEYCLOAK_SERVER_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: process.env.KEYCLOAK_CLIENT_ID!,
			refresh_token: refreshToken,
		}),
	});

	// Clear cookies
	res.clearCookie(process.env.COOKIE_KEY!, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
	});

	res.clearCookie(process.env.REFRESH_KEY!, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: process.env.NODE_ENV === "development" ? "lax" : "strict",
	});

	return res.status(200).json({ message: 'Logged out successfully' });
};
