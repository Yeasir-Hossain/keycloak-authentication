import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

export default async function auth(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req?.cookies?.[process.env.COOKIE_KEY!] || req?.headers?.authorization?.replace("Bearer ", "");

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		if (!token && this.continue) return res.status(401).json({ message: 'No token provided' });

		const decoded = jwt.decode(token!) as JwtPayload;
		if (!decoded) {
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

			return res.status(401).json({ message: 'Unauthorized' });
		};

		req.user = {
			sid: decoded?.sid,
			email: decoded?.email,
			name: decoded?.name,
		};

		next();
	} catch (error) {
		console.error('Token validation error:', error);
		res.status(401).json({ message: 'Invalid token' });
	}
};