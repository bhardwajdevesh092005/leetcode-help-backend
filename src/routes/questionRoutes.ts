import * as express from 'express';

// import { getQuestionBySlug, getCodeForQuestion } from "../controllers/questionController";
import { getQuestionBySlug, getCodeForQuestion } from "../controllers/questionController.ts";
const router = express.Router();
router.get('/:slug', async (req, res, next) => {
	try {
		await getQuestionBySlug(req, res);
	} catch (error) {
		next(error);
	}
}); 
router.get('/:slug/getCode/:language',(req,res,next)=>{
    getCodeForQuestion(req,res).catch(next);
});

export default router;