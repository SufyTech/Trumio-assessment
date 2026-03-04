import { test } from "@playwright/test";

test("Check OrangeHRM status", async ({ page }) => {
  const response = await page.goto("https://opensource-demo.orangehrmlive.com");

  console.log("Status:", response?.status());
  console.log("URL:", page.url());
});
