import { Request, Response } from "express";
import Text from "./model";
import { textCreateValidation, textUpdateValidation } from "./validation";
import HttpError from "../../errors/httpError";

/**
 * Fetch all texts from the database.
 */
export const getAll = async (_req: Request, res: Response): Promise<Response> => {
	const texts = await Text.find();
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