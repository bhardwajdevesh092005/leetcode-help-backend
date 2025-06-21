import axios from 'axios';
// import { problemList } from './leetcode_problems.ts';
// import { connectDB } from './db.js';
// import { Question } from './models/Question.ts';

const url = 'https://leetcode.com/graphql';
// const allProblems = problemList;

const questionDetailQuery = `
  query getQuestionDetail($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      title
      titleSlug
      difficulty
      acRate
      isPaidOnly
      content
      sampleTestCase
      exampleTestcases
      metaData
      codeSnippets {
        lang
        code
      }
      topicTags {
        name
        slug
      }
    }
  }
`;
const BATCH_SIZE = 20;
const BATCH_DELAY_MS = 100;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchQuestionDetail(titleSlug:string) {
  try {
    const res = await axios.post(
      url,
      {
        query: questionDetailQuery,
        variables: { titleSlug }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Referer': `https://leetcode.com/problems/${titleSlug}`,
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );
    return res.data.data.question;
  } catch (err) {
    console.error(`Error fetching ${titleSlug}:`, err.response?.data || err.message);
    return null;
  }
}

// async function fetchAndSaveQuestions(problems) {
//   await connectDB(); // Connect to MongoDB

//   for (let i = 0; i < problems.length; i += BATCH_SIZE) {
//     const batch = problems.slice(i, i + BATCH_SIZE);

//     const results = await Promise.all(batch.map(p => fetchQuestionDetail(p.titleSlug)));

//     for (const q of results) {
//       if (!q) continue;

//       const doc = new Question({
//         questionId: q.questionId,
//         title: q.title,
//         titleSlug: q.titleSlug,
//         difficulty: q.difficulty,
//         acRate: q.acRate,
//         paidOnly: q.isPaidOnly,
//         topicTags: q.topicTags.map(tag => tag.name)
//       });

//       try {
//         await doc.save();
//         console.log(`Saved: ${q.title}`);
//       } catch (err) {
//         console.error(`Error saving ${q.title}:`, err.message);
//       }
//     }

//     console.log(`Completed ${Math.min(i + BATCH_SIZE, problems.length)} / ${problems.length}`);
//     await sleep(BATCH_DELAY_MS);
//   }

//   console.log('All questions saved to MongoDB');
// }

// fetchAndSaveQuestions(allProblems);
fetchQuestionDetail('two-sum').then(res=>console.log(res)).catch(console.error);
