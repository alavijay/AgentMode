require("dotenv").config();
const { test, expect } = require("@playwright/test");

const LoginPage = require("../pages/LoginPage");
const { generatePlan } = require("../ai/planner");
const { executePlan } = require("../core/executor");
const { analyzeFailure } = require("../ai/analyzer");

test("AI-driven login test", async ({ page }) => {
  const loginPage = new LoginPage(page);

  const requirement = "Test login with valid user";

  let plan;

  try {
    plan = await generatePlan(requirement);
    console.log("Generated Plan:", plan);

    await executePlan(page, plan, loginPage);

    // assertion - use heading for specificity
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    console.log("✓ Dashboard page loaded successfully");

  } catch (error) {
    console.error("Test failed:", error.message);

    const analysis = await analyzeFailure(error, plan);
    console.log("AI Analysis:", analysis);

    throw error;
  }
});