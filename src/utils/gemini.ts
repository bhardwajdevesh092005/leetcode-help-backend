import { GoogleGenAI } from "@google/genai";


import dotenv from "dotenv";

export function buildGeminiPromptFromQuestionJson(questionJson: any, language: string): string {
  return `
You are an AI assistant helping build a LeetCode code generator tool.

You will receive the full JSON of a LeetCode problem.

Your task is to return a structured response containing starter code, test input, and a compile/run command for a given language.

---

🔹 **1. Code Requirements**:
- Use the language: **${language}**
- Define the \`Solution\` class using the correct method signature from the problem
- If the problem involves special data structures (e.g. binary trees, linked lists), define minimal working versions (\`TreeNode\`, \`ListNode\`) as needed
- Do **not** implement the logic inside the method(s) — only the structure
- Implement a test harness that:
  - Reads **multiple test cases** from an \`input.txt\` file
  - For each test case:
    - Parses the input
    - Calls the solution method
    - Appends the result to \`output.txt\`

Use the appropriate loop style for the given language:
- Python: \`for _ in range(t):\`
- Java: \`for (int i = 0; i < t; i++)\`
- C++: \`while (t--)\`

---

🔹 **2. Test Case Extraction**:
- Extract all test cases (or examples) from the problem JSON
- Convert them into a unified input format suitable for the program
- Include the number of test cases \`t\` as the first line
- Also include size of input array if applicable because it is also neccessary
- Format the input as a single string with each test case on a new line remove the brackets and commas

---

🔹 **3. Command**:
- Provide a shell command to compile and run the code in ${language} that writes ouput directly to output.txt

---

🔒 Constraints:
- Your response must be a single JSON object with 4 fields:
  - \`code\`: the complete code
  - \`input\`: all formatted test case inputs (with \`t\` as the first line)
  - \`command\`: shell command for compile/run
  - \`testCaseCount\`: number of test cases

- ❌ Do not include any explanations, markdown, or extra text — just the raw JSON.
- ❌ Do not include \`\`\`json or any other formatting in the response.
- ❌ Do not include std resolver but use using namespace std for C++.
---

Here is the full LeetCode problem JSON:
\`\`\`json
${JSON.stringify(questionJson, null, 2)}
\`\`\`
`;
}
export const geminiCodeGenerator = async (question:any,lang:string)=>{
    dotenv.config();
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("Missing GOOGLE_API_KEY");

    const genAI = new GoogleGenAI({ apiKey });
    console.log("Google Generative AI initialized", "✅");

    const prompt = buildGeminiPromptFromQuestionJson(question, lang);
    console.log("Prompt built successfully ✅");

    const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });
    console.log("Gemini content recieved",result);
    const responseText = result.candidates[0].content.parts[0].text;
    // console.log("Gemini response received:", responseText);
    const cleaned = responseText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    try {
        return parsed;
    } catch (e) {
        console.error("Failed to parse Gemini response:", responseText);
        throw new Error("Gemini response is not valid JSON.");
    }
}
