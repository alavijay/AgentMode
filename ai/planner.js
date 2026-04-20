const axios = require("axios");

async function generatePlan(requirement) {
  // Mock response for testing - avoids API quota limits
  const mockPlan = {
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
  
  console.log("Using mock plan generator (API quota avoided)");
  return mockPlan;
}

module.exports = { generatePlan };