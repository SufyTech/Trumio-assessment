import { test, expect } from "@playwright/test";
import EmployeePage from "../../pages/EmployeePage";
import DashboardPage from "../../pages/DashboardPage";

test.describe("OrangeHRM Employee Tests", () => {
  let employeePage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    employeePage = new EmployeePage(page);
    dashboardPage = new DashboardPage(page);

    // Navigate to login page
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    // Login
    await page.fill('input[name="username"]', "Admin");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');

    // Wait for dashboard to appear
    await page.waitForURL(/dashboard/, { timeout: 120000 });
    await page.waitForSelector('h6:has-text("Dashboard")', { timeout: 120000 });
    console.log("✅ Logged in successfully");
  });

  test("Add, Search, Edit and Delete Employee", async ({ page }) => {
    await employeePage.addEmployee("TestFirst", "TestLast", "12345");
    await employeePage.searchEmployee("TestFirst");
    await employeePage.editEmployee("UpdatedFirst", "UpdatedLast");
    await employeePage.deleteEmployee();
    console.log("✅ Employee tests completed successfully");
  });

  test.afterEach(async ({ page }) => {
    await dashboardPage.logout();
    console.log("✅ Logged out successfully");
  });
});
