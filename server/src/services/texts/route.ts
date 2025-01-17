import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getAll } from "./entity";

const router = Router();

router.get("/text", asyncHandler(getAll));

export default router;
