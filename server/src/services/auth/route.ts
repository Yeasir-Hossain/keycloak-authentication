import { asyncHandler } from './../../utils/asyncHandler';
import { Router } from "express";
import { keycloak } from "../../controllers/keyCloak";
import { me } from './entity';

const router = Router();

router.get('/user/login', (req, res) => res.redirect(keycloak.loginUrl("idontknow", process.env.REDIRECT_URL!)));
router.get('/user/me', keycloak.protect(), asyncHandler(me));

export default router;