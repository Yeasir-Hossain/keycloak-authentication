import { Request, Response, NextFunction } from 'express';
import Text from './model'

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
	const texts = await Text.find();
	return res.status(200).send(texts);
};