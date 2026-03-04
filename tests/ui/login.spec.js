// tests/ui/login.spec.js
const { test } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");

test.describe("OrangeHRM Login Tests", () => {
  test("Valid Login Test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("Admin", "admin123");
    await loginPage.waitForDashboard();
    console.log("✅ Logged in successfully");
  });

  test("Invalid Login Test", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("WrongUser", "WrongPass");
    await loginPage.waitForError();
    console.log("⚠️ Invalid login error displayed");
  });
});
