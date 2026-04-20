async function mapStep(page, step, loginPage) {
  try {
    if (step.includes("navigate")) {
      console.log("Navigating to SnipeIt");
      await loginPage.goToSnipeIt();
      // Wait for page to fully load
      await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(2000); // Give page time to render
    }

    if (step.includes("enter username")) {
      console.log("Entering username");
      await page.waitForTimeout(1000);
      const field = page.getByRole('textbox', { name: /Username|username/i });
      await field.scrollIntoViewIfNeeded();
      await field.fill(process.env.USERNAME);
      console.log("Username filled");
    }

    if (step.includes("enter password")) {
      console.log("Entering password");
      await page.waitForTimeout(1000);
      const field = page.getByRole('textbox', { name: /Password|password/i });
      await field.scrollIntoViewIfNeeded();
      await field.fill(process.env.PASSWORD);
      console.log("Password filled");
    }

    if (step.includes("click login")) {
      console.log("Clicking login button");
      await page.waitForTimeout(1000);
      const button = page.getByRole('button', { name: /Login|login/i });
      await button.scrollIntoViewIfNeeded();
      await button.click();
      console.log("Login button clicked, waiting for navigation...");
      // Wait for navigation after login
      await page.waitForLoadState('load', { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(3000); // Give time for page to fully render
    }
  } catch (error) {
    console.error(`Error executing step "${step}":`, error.message);
    throw error;
  }
}

module.exports = { mapStep };