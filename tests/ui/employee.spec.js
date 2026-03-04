const { test, expect } = require("@playwright/test");
const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const EmployeePage = require("../../pages/EmployeePage");
const employeeData = require("../../test-data/employeeData.json");

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
  });

  test("Create Employee", async ({ page }) => {
    await employeePage.addEmployee(
      employeeData.newEmployee.firstName,
      employeeData.newEmployee.lastName,
      employeeData.newEmployee.id,
    );
    await expect(page.locator("text=Successfully Saved")).toBeVisible();
  });

  test("Verify Employee in List", async ({ page }) => {
    await employeePage.searchEmployee(employeeData.newEmployee.id);
    await expect(
      page.locator(`text=${employeeData.newEmployee.firstName}`),
    ).toBeVisible();
  });

  test("Edit Employee", async ({ page }) => {
    await employeePage.searchEmployee(employeeData.newEmployee.id);
    await employeePage.editEmployee(
      employeeData.updatedEmployee.firstName,
      employeeData.updatedEmployee.lastName,
    );
    await expect(page.locator("text=Successfully Updated")).toBeVisible();
  });

  test("Delete Employee", async ({ page }) => {
    await employeePage.searchEmployee(employeeData.newEmployee.id);
    await employeePage.deleteEmployee();
    await expect(page.locator("text=Successfully Deleted")).toBeVisible();
  });

  test("Logout", async ({ page }) => {
    await dashboardPage.logout();
    await expect(page).toHaveURL(/auth\/login/);
  });
});
