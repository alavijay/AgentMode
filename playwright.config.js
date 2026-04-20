// @ts-check
const { defineConfig } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',

  timeout: 60 * 1000,

  expect: {
    timeout: 10000,
  },

  use: {
    baseURL: process.env.URL,
    headless: false,

    screenshot: 'only-on-failure',
    //video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  retries: 0,

  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],
});