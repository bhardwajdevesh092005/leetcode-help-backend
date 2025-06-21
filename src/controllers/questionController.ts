import { Request, Response } from "express";
import { Question } from "../models/Question";
import {Code} from "../models/Code";

export const getQuestionBySlug = async (req: Request, res: Response) => {
    try {
        const question = await Question.findOne({
            titleSlug: req.params.slug,
        })
        if (!question) return res.status(404).json({ error: 'Not found' });
        res.json(question);
    }catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const getCodeForQuestion = async (req: Request, res: Response)=>{
    try{
        const question = Question.findOne({titleSlug:req.params.slug});
        if(!question){
            return res.status(404).json({error: 'Question corresponding to the slug not found.'})
        }
        const code = Code.findOne({titleSlug: req.params.slug});
        if(!code){
            // call Gemini
        }
    }catch{

    }
}