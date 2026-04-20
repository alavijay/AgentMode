const axios = require("axios");

async function analyzeFailure(error, plan) {
  // Mock response for testing - avoids API quota limits
  const mockAnalysis = `
Root Cause Analysis:
The test failed because the login credentials were incorrect or the page didn't load properly.

Recommended Fix:
1. Verify the URL is accessible
2. Check that USERNAME and PASSWORD environment variables are correct
3. Add explicit waits for page elements to load
4. Consider adding retry logic for flaky network conditions
`;
  
  console.log("Using mock analyzer (API quota avoided)");
  return mockAnalysis;
}

module.exports = { analyzeFailure };