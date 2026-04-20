const axios = require("axios");
require("dotenv").config();

let cachedAnalysis = null;

async function analyzeFailure(error, plan) {
  // Check if using mock or real AI
  const useMock = process.env.USE_MOCK_AI !== 'false';

  if (useMock) {
    // Return cached mock analysis
    if (cachedAnalysis) {
      console.log("Using cached mock analysis");
      return cachedAnalysis;
    }

    cachedAnalysis = `
Root Cause Analysis:
The test failed because the login credentials were incorrect or the page didn't load properly.

Recommended Fix:
1. Verify the URL is accessible
2. Check that USERNAME and PASSWORD environment variables are correct
3. Add explicit waits for page elements to load
4. Consider adding retry logic for flaky network conditions
`;
    
    console.log("Generated and cached mock analysis");
    return cachedAnalysis;
  }

  // Real AI mode - call Gemini API
  try {
    console.log("Calling Gemini API for failure analysis...");
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
Test failed.

Plan:
${JSON.stringify(plan)}

Error:
${error.message}

Explain root cause and fix.
`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "content-type": "application/json"
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("API Error Details:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { analyzeFailure };