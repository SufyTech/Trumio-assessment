// tests/ui/employee.spec.js
import { test, expect } from "@playwright/test";
import LoginPage from "../../pages/LoginPage.js";
import DashboardPage from "../../pages/DashboardPage.js";
import EmployeePage from "../../pages/EmployeePage.js";
import employeeData from "../../test-data/employeeData.json" assert { type: "json" };

test.describe("Employee Management Tests", () => {
  let loginPage, dashboardPage, employeePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    employeePage = new EmployeePage(page);

    await loginPage.navigate();
    await loginPage.login(
      employeeData.credentials.username,
      employeeData.credentials.password,
    );

    // Wait for dashboard to fully load
    await page.waitForURL("**/dashboard/index", { timeout: 60000 });
  });

  test("Create Employee", async ({ page }) => {
    await dashboardPage.navigateToEmployeePage();
    await employeePage.addButton.waitFor({ state: "visible", timeout: 60000 });
    await employeePage.addEmployee(
      employeeData.newEmployee.firstName,
      employeeData.newEmployee.lastName,
      employeeData.newEmployee.id,
    );
  });

  test("Verify Employee in List", async ({ page }) => {
    await employeePage.searchInput.waitFor({ state: "visible" });
    await employeePage.searchEmployee(employeeData.newEmployee.id);
    expect(
      await employeePage.getEmployeeRow(employeeData.newEmployee.id),
    ).toBeTruthy();
  });

  test("Edit Employee", async ({ page }) => {
    await employeePage.searchEmployee(employeeData.newEmployee.id);
    await employeePage.editEmployee("EditedFirst", "EditedLast");
  });

  test("Delete Employee", async ({ page }) => {
    await employeePage.searchEmployee(employeeData.newEmployee.id);
    await employeePage.deleteEmployee();
  });

  test("Logout", async ({ page }) => {
    await dashboardPage.logoutButton.waitFor({ state: "visible" });
    await dashboardPage.logout();
    await page.waitForURL("**/auth/login", { timeout: 60000 });
  });
});
