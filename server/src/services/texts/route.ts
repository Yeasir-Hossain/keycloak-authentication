import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { addText, deleteText, getAll, getOne, updateText } from "./entity";

const router = Router();

router.post("/text", asyncHandler(addText));
router.get("/text", asyncHandler(getAll));
router.get("/text/:id", asyncHandler(getOne));
router.patch("/text/:id", asyncHandler(updateText));
router.delete("/text/:id", asyncHandler(deleteText));

export default router;
