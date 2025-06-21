import * as express from 'express';

import { getQuestionBySlug, getCodeForQuestion } from "../controllers/questionController";

const router = express.Router();
router.get('/:slug', (req, res, next) => {
	getQuestionBySlug(req, res).catch(next);
});
router.get('/:slug/getCode',(req,res,next)=>{
    getCodeForQuestion(req,res).catch(next);
});

export default router;