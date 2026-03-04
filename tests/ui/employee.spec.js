// tests/ui/employee.spec.js
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

    // Wait for Dashboard to be visible
    await page.waitForURL(/dashboard/, { timeout: 60000 }); // wait for redirect
    await page.waitForSelector('h6:has-text("Dashboard")', { timeout: 60000 }); // correct selector
    console.log("✅ Logged in successfully");
  });

  test("Add, Search, Edit and Delete Employee", async ({ page }) => {
    // Add Employee
    await employeePage.addEmployee("TestFirst", "TestLast", "12345");

    // Search Employee by name
    await employeePage.searchEmployee("TestFirst");

    // Edit Employee
    await employeePage.editEmployee("UpdatedFirst", "UpdatedLast");

    // Delete Employee
    await employeePage.deleteEmployee();

    console.log("✅ Employee tests completed successfully");
  });

  test.afterEach(async ({ page }) => {
    // Logout
    await dashboardPage.logout();
    console.log("✅ Logged out successfully");
  });
});
