import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { addText, getAll } from "./entity";

const router = Router();

router.post("/text", asyncHandler(addText));
router.get("/text", asyncHandler(getAll));

export default router;
