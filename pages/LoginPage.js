const { expect } = require("@playwright/test");
require("dotenv").config();

const url = process.env.URL;

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goToSnipeIt() {
    await this.page.goto('/');
  }
}

module.exports = LoginPage;