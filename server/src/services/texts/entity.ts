import { Request, Response, NextFunction } from "express";
import Text from "./model";
import { textCreateValidation } from "./validation";

/**
 * Fetch all texts from the database.
 */
export const getAll = async (_req: Request, res: Response, _next: NextFunction): Promise<Response | void> => {
	const texts = await Text.find();
	return res.status(200).json(texts);
};

/**
 * Add a new text entry to the database.
 */
export const addText = async (req: Request, res: Response, _next: NextFunction): Promise<Response | void> => {
	const data = await textCreateValidation.validateAsync(req.body, { abortEarly: false });
	const text = await Text.create(data);
	return res.status(201).json(text);
};