// pages/EmployeePage.js
import { expect } from "@playwright/test";

export default class EmployeePage {
  constructor(page) {
    this.page = page;
    this.addButton = page.locator('button:has-text("Add")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input[name="employeeId"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.searchInput = page.locator('input[placeholder="Search"]');
    this.editButton = page.locator('button:has-text("Edit")');
    this.deleteButton = page.locator('button:has-text("Delete")');
    this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
  }

  async waitForDashboard() {
    await this.page.waitForSelector(
      'p:has-text("Dashboard"), h6:has-text("Dashboard")',
      { timeout: 90000 },
    );
  }

  async addEmployee(firstName, lastName, employeeId) {
    await this.waitForDashboard();
    await this.addButton.waitFor({ state: "visible", timeout: 90000 });
    await this.addButton.click();

    await this.firstNameInput.waitFor({ state: "visible", timeout: 90000 });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(employeeId);
    await this.saveButton.click();

    console.log(`✅ Employee ${firstName} ${lastName} added`);
  }

  async searchEmployee(name) {
    await this.searchInput.waitFor({ state: "visible", timeout: 90000 });
    await this.searchInput.fill(name);
    await this.page.keyboard.press("Enter");
    console.log(`🔍 Searched employee: ${name}`);
  }

  async editEmployee(newFirstName, newLastName) {
    await this.editButton.waitFor({ state: "visible", timeout: 90000 });
    await this.editButton.click();

    await this.firstNameInput.fill(newFirstName);
    await this.lastNameInput.fill(newLastName);
    await this.saveButton.click();

    console.log(`✏️ Employee updated to: ${newFirstName} ${newLastName}`);
  }

  async deleteEmployee() {
    await this.deleteButton.waitFor({ state: "visible", timeout: 90000 });
    await this.deleteButton.click();
    await this.confirmDeleteButton.waitFor({
      state: "visible",
      timeout: 90000,
    });
    await this.confirmDeleteButton.click();

    console.log(`🗑️ Employee deleted`);
  }
}
