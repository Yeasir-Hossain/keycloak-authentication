import { Router } from "express";

import textsRoute from "../../services/texts/route";
import authRoute from "../../services/auth/route";

const router: Router = Router();

const v1: Array<Router> = [textsRoute, authRoute];

router.use("/api/v1", v1);

export default router;
