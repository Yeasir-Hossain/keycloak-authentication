import { Request, Response } from "express";
import Text from "./model";
import { textCreateValidation, textUpdateValidation } from "./validation";
import HttpError from "../../errors/httpError";
import redis from "../../controllers/redis";
import { cacheKey } from "../../utils/cache";

/**
 * Fetch all texts from the database.
 */
export const getAll = async (req: Request, res: Response): Promise<Response> => {
	const query: { email?: string } = {};
	if (typeof req.query.email === 'string') {
		query.email = req.query.email;
		await redis.removeValue(cacheKey.list());
	}

	// Fetch texts with the query
	const texts = await Text.find(query);
	return res.status(200).json(texts);
};

/**
 * Fetch one text from the database.
 */
export const getOne = async (req: Request, res: Response): Promise<Response> => {
	const text = await Text.findById(req.params.id);
	if (!text) throw new HttpError("Text not found", 404, true);
	return res.status(200).json(text);
};

/**
 * Add a new text entry to the database.
 */
export const addText = async (req: Request, res: Response): Promise<Response> => {
	const data = await textCreateValidation.validateAsync(req.body, { abortEarly: false });
	if (req.user.email) data.email = req.user.email;
	const text = await Text.create(data);
	return res.status(201).json(text);
};

/**
 * Update an existing text entry in the database.
 */
export const updateText = async (req: Request, res: Response): Promise<Response> => {
	const id = req.params.id;
	const data = await textUpdateValidation.validateAsync(req.body, { abortEarly: false });

	const text = await Text.findByIdAndUpdate(id, data, { new: true });
	if (!text) throw new HttpError("Text not found", 404, true);

	return res.status(200).json(text);
};

/**
 * Delete a text entry from the database.
 */
export const deleteText = async (req: Request, res: Response): Promise<Response> => {
	const id = req.params.id;

	const text = await Text.findByIdAndDelete(id);
	if (!text) throw new HttpError("Text not found", 404, true);

	return res.status(200).json({ message: 'Text deleted successfully' });
};

/**
 * text analyzer entities
 */

export const getWordCount = async (req: Request, res: Response): Promise<Response> => {
	const text = await Text.findById(req.params.id).select('wordCount');
	if (!text) throw new HttpError("Text not found", 404, true);
	return res.status(200).json(text);
};

export const getCharacterCount = async (req: Request, res: Response): Promise<Response> => {
	const text = await Text.findById(req.params.id).select('characterCount');
	if (!text) throw new HttpError("Text not found", 404, true);
	return res.status(200).json(text);
};

export const getSentenceCount = async (req: Request, res: Response): Promise<Response> => {
	const text = await Text.findById(req.params.id).select('sentenceCount');
	if (!text) throw new HttpError("Text not found", 404, true);
	return res.status(200).json(text);
};

export const getParagraphCount = async (req: Request, res: Response): Promise<Response> => {
	const text = await Text.findById(req.params.id).select("paragraphCount");
	if (!text) throw new HttpError("Text not found", 404, true);
	return res.status(200).json(text);
};

export const getLongestWords = async (req: Request, res: Response): Promise<Response> => {
	const text = await Text.findById(req.params.id).select('longestWords');
	if (!text) throw new HttpError("Text not found", 404, true);
	return res.status(200).json(text);
};