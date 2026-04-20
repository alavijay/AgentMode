const axios = require("axios");
require("dotenv").config();


let cachedPlan = null;

async function generatePlan(requirement) {
  // Check if using mock or real AI
  const useMock = process.env.USE_MOCK_AI !== 'false';

  if (useMock) {
    // Return cached mock plan
    if (cachedPlan) {
      console.log("Using cached mock plan");
      return cachedPlan;
    }

    cachedPlan = {
      clauses: [
        {
          condition: "User is on login page",
          steps: [
            "navigate to login page",
            "enter username",
            "enter password",
            "click login button"
          ],
          expected_result: "User logged in successfully"
        }
      ]
    };
    
    console.log("Generated and cached mock plan");
    return cachedPlan;
  }

  // Real AI mode - call Gemini API
  try {
    console.log("Calling Gemini API for plan generation...");
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
Act as a QA automation architect.

Convert this requirement into JSON:
- clauses (condition, steps, expected_result)

Requirement:
${requirement}

Return STRICT JSON only.
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

    const text = response.data.candidates[0].content.parts[0].text;
    return JSON.parse(text);
  } catch (err) {
    console.error("Plan Generation Error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { generatePlan };