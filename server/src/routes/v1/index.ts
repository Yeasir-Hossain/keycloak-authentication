import { Router } from "express";

const router: Router = Router();

const v1: Array<Router> = [];

router.use("/api/v1", v1);

export default router;
