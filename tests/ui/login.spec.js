// tests/ui/login.spec.js
import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";

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
