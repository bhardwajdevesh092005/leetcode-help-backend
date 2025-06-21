import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionId: String,

  title: String,
  
  titleSlug: String,
  
  difficulty: String,
  
  acRate: Number,
  
  isPaidOnly: Boolean,
  
  topicTags: [String],
  
  content: String,
  
  sampleTestCase: String,
  
  exampleTestcases: String,
  
  metaData: Object,
  
  codeSnippets: [
    {
      lang: String,
      code: String
    }
  ]
});

export const Question = mongoose.model('Question', questionSchema);
