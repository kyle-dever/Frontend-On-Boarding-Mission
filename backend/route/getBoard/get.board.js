import { Router } from 'express';
import * as getMiddleware from './get.board.controller.js';

const router = Router();

router.get('/Home', getMiddleware.getList);
router.get('/Category', getMiddleware.getListFromCategory);
router.get('/Count', getMiddleware.getCount);

export default router;
