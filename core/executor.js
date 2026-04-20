const { mapStep } = require("./mapper");

async function executePlan(page, plan, loginPage) {
  for (const clause of plan.clauses) {
    console.log("Running clause:", clause.condition);

    for (const step of clause.steps) {
      console.log("Step:", step);
      await mapStep(page, step, loginPage);
    }
  }
}

module.exports = { executePlan };