import { Request, Response } from "express";

/**
 * Fetch the user profile data.
 */
export const me = async (req: Request, res: Response): Promise<Response> => {
	const token = req.kauth?.grant?.access_token;

	if (!token) {
		return res.status(401).json({ message: "Unauthorized: No access token found" });
	}

	return res.status(200).json({
		username: token.content.preferred_username,
		email: token.content.email,
		firstName: token.content.given_name,
		lastName: token.content.family_name,
	});
};
