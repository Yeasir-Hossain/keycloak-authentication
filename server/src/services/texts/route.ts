import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
	addText,
	deleteText,
	getAll,
	getCharacterCount,
	getLongestWords,
	getOne,
	getParagraphCount,
	getSentenceCount,
	getWordCount,
	updateText,
} from "./entity";
import cacheMiddleware from "../../middleware/cache";
import redis from "../../controllers/redis";
import * as cacheUtils from "../../utils/cache";

const router = Router();

router.post("/text", asyncHandler(async (req, res) => {
	await addText(req, res);
	await redis.removeValue(cacheUtils.cacheKey.list());
})
);

router.get("/text", cacheMiddleware(() => cacheUtils.cacheKey.list()), asyncHandler(getAll));
router.get("/text/:id", cacheMiddleware((req) => cacheUtils.cacheKey.one(req.params.id)), asyncHandler(getOne));

router.get(
	"/text/:id/words",
	cacheMiddleware((req) => cacheUtils.cacheKey.words(req.params.id)),
	asyncHandler(getWordCount)
);
router.get(
	"/text/:id/characters",
	cacheMiddleware((req) => cacheUtils.cacheKey.characters(req.params.id)),
	asyncHandler(getCharacterCount)
);

router.get(
	"/text/:id/sentences",
	cacheMiddleware((req) => cacheUtils.cacheKey.sentences(req.params.id)),
	asyncHandler(getSentenceCount)
);

router.get(
	"/text/:id/paragraphs",
	cacheMiddleware((req) => cacheUtils.cacheKey.paragraphs(req.params.id)),
	asyncHandler(getParagraphCount)
);

router.get(
	"/text/:id/longest-words",
	cacheMiddleware((req) => cacheUtils.cacheKey.longestWords(req.params.id)),
	asyncHandler(getLongestWords)
);

router.patch(
	"/text/:id",
	asyncHandler(async (req, res) => {
		await updateText(req, res);
		await cacheUtils.invalidateCache(req.params.id);
	})
);

router.delete(
	"/text/:id",
	asyncHandler(async (req, res) => {
		await deleteText(req, res);
		await cacheUtils.invalidateCache(req.params.id);
	})
);

export default router;
