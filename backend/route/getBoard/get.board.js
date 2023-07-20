import { Router } from 'express';
import * as getMiddleware from './get.board.controller.js';

const router = Router();

router.get('/Home', getMiddleware.getList);
router.get('/Category', getMiddleware.getListFromCategory);
router.get('/board', getMiddleware.getBoardFromId);
router.get('/search', getMiddleware.searchBoardFromKeyword);

export default router;
