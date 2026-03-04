// tests/ui/employee.spec.js
import { test, expect } from "@playwright/test";
import EmployeePage from "../../pages/EmployeePage";
import DashboardPage from "../../pages/DashboardPage";

test.describe("OrangeHRM Employee Tests", () => {
  test("Add, Search, Edit and Delete Employee", async ({ page }) => {
    const employeePage = new EmployeePage(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to login
    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    // Login
    await page.fill('input[name="username"]', "Admin");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');

    // Wait for dashboard
    await page.waitForSelector('p:has-text("Dashboard")', { timeout: 60000 });

    // Add Employee
    await employeePage.addEmployee("TestFirst", "TestLast", "12345");

    // Search Employee
    await employeePage.searchEmployee("TestFirst");

    // Edit Employee
    await employeePage.editEmployee("TestEdited", "TestLast");

    // Delete Employee
    await employeePage.deleteEmployee();

    // Logout
    await dashboardPage.logout();

    // Confirm logout
    expect(page.url()).toContain("/auth/login");
  });
});
