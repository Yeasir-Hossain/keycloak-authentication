import { asyncHandler } from './../../utils/asyncHandler';
import { Router } from "express";
import { login, logout, me, refreshToken, register } from './entity';
import auth from '../../middleware/auth';

const router = Router();

router.post('/user/register', asyncHandler(register));
router.post('/user/login', asyncHandler(login));
router.get('/user/refresh-token', asyncHandler(refreshToken));
router.get('/user/logout', asyncHandler(logout));
router.get('/user/me', auth, asyncHandler(me));

export default router;