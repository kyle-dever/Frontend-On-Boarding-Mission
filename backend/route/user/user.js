import { Router } from 'express';
import * as userMiddleware from './user.controller.js';

const router = Router();

router.post('/signin', userMiddleware.signin);
router.post('/login', userMiddleware.login);
router.post('/reissue', userMiddleware.reissue);
router.post('/submit', userMiddleware.submit);

export default router;
