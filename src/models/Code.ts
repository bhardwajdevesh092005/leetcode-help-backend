// models/GeneratedCode.ts
import mongoose from 'mongoose';

const generatedCodeSchema = new mongoose.Schema({
  titleSlug: {
    type: String,
    required: true
  },
  lang: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  
});

export const Code = mongoose.model('GeneratedCode', generatedCodeSchema);
