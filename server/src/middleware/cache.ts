import { Request, Response, NextFunction } from "express";
import redis from "../controllers/redis";
import logger from "../utils/logger";

const cacheMiddleware = (keyGenerator: (req: Request) => string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const cacheKey = keyGenerator(req);

			// Check for cached data
			const cachedData = await redis.getValue(cacheKey);
			if (cachedData) {
				return res.status(200).json(JSON.parse(cachedData));
			}
			// Override res.json to asynchronously cache the response
			const originalJson = res.json.bind(res);
			res.json = (data): Response => {
				if (res.statusCode === 200) {
					redis.setValue(cacheKey, JSON.stringify(data), 60).catch((err) => {
						logger.error(`Error caching data for key ${cacheKey}:`, err);
					});
				}

				return originalJson(data);
			};

			next();
		} catch (error) {
			logger.error("Cache middleware error:", error);
			next();
		}
	};
};

export default cacheMiddleware;
