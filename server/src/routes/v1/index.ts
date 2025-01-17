import { Router } from "express";

import taskRoute from "../../services/texts/route";

const router: Router = Router();

const v1: Array<Router> = [taskRoute];

router.use("/api/v1", v1);

export default router;
