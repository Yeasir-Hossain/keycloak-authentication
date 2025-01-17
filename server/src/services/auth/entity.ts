import { Request, Response } from "express";

/**
 * Fetch the user profile data.
 */
export const me = async (req: Request, res: Response): Promise<Response> => {
	const token = req.kauth?.grant?.access_token;
	console.log(token);
	return res.status(200).json(token.content);
};
