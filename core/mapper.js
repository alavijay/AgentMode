async function mapStep(page, step, loginPage) {
  try {
    if (step.includes("navigate")) {
      console.log("Navigating to SnipeIt");
      await loginPage.goToSnipeIt();
      await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
    }

    if (step.includes("enter username")) {
      console.log("Entering username");
      const field = page.getByRole('textbox', { name: /Username|username/i });
      await field.scrollIntoViewIfNeeded();
      await field.fill(process.env.USERNAME);
      console.log("Username filled");
    }

    if (step.includes("enter password")) {
      console.log("Entering password");
      const field = page.getByRole('textbox', { name: /Password|password/i });
      await field.scrollIntoViewIfNeeded();
      await field.fill(process.env.PASSWORD);
      console.log("Password filled");
    }

    if (step.includes("click login")) {
      console.log("Clicking login button");
      const button = page.getByRole('button', { name: /Login|login/i });
      await button.scrollIntoViewIfNeeded();
      await button.click();
      console.log("Login button clicked, waiting for navigation...");
      await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
    }
  } catch (error) {
    console.error(`Error executing step "${step}":`, error.message);
    throw error;
  }
}

module.exports = { mapStep };