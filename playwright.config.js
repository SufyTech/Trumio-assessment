// playwright.config.js
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  retries: 1,
  workers: 1,
  timeout: 120000, // 2 min per test

  reporter: "html",

  use: {
    baseURL: "https://opensource-demo.orangehrmlive.com",
    navigationTimeout: 60000,
    actionTimeout: 60000,
    ignoreHTTPSErrors: true,
    headless: false,
    viewport: { width: 1280, height: 720 },
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "edge",
      use: {
        browserName: "chromium",
        channel: "msedge", // uses installed Edge
        headless: false,
      },
    },
  ],
});
