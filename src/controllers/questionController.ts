import * as express from 'express';
import { Question } from "../models/Question.ts";
import {Code} from "../models/Code.ts";
import {geminiCodeGenerator} from "../utils/gemini.ts";
export const getQuestionBySlug = async (req: express.Request, res: express.Response) => {
    try {
        const question = await Question.findOne({
            titleSlug: req.params.slug,
        })
        if (!question) return res.status(404).json({ error: 'Not found' });
        return res.status(200).json(question);
    }catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export const getCodeForQuestion = async (req: express.Request, res: express.Response)=>{
    try{
        const question = await Question.findOne({titleSlug:req.params.slug});
        if(!question){
            return res.status(404).json({error: 'Question corresponding to the slug not found.'})
        }else console.log('Question found:', (question).titleSlug);
        const code = await Code.findOne({titleSlug: req.params.slug, lang: req.params.language});
        console.log('Code found:', code);
        if(!code){
            const resp = await geminiCodeGenerator(question, req.params.language);
            if(!resp || !resp.code){
                console.error('Failed to generate code from Gemini response:', resp);
                return res.status(500).json({error: 'Failed to generate code.'});
            }
            console.log(resp);
            const doc = new Code({
                titleSlug: question.titleSlug,
                lang: req.params.language,
                code: resp.code,
                input: resp.input || '',
                command: resp.command || '',
                testCaseCount: resp.testCaseCount || 0,
            });
            await doc.save();
            console.log('Code saved to database:', doc);
            return res.status(200).json(resp);
        }else{
            console.log('Code already exists in database:', code);
            res.status(200).json(code);
        }
        return res.status(200).json(code); 
    }catch(error){
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
}