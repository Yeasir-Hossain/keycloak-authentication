import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { addText, deleteText, getAll, getCharacterCount, getLongestWords, getOne, getParagraphCount, getSentenceCount, getWordCount, updateText } from "./entity";

const router = Router();

router.post("/text", asyncHandler(addText));
router.get("/text", asyncHandler(getAll));
router.get("/text/:id", asyncHandler(getOne));
router.get("/text/:id/words", asyncHandler(getWordCount));
router.get("/text/:id/characters", asyncHandler(getCharacterCount));
router.get("/text/:id/sentences", asyncHandler(getSentenceCount));
router.get("/text/:id/paragraphs", asyncHandler(getParagraphCount));
router.get("/text/:id/longest-words", asyncHandler(getLongestWords));
router.patch("/text/:id", asyncHandler(updateText));
router.delete("/text/:id", asyncHandler(deleteText));

export default router;