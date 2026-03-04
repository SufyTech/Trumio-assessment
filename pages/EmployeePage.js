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
    this.searchButton = page.locator('button:has-text("Search")');
    this.editButton = page.locator('button:has-text("Edit")');
    this.deleteButton = page.locator('button:has-text("Delete")');
    this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
  }

  async waitForDashboard() {
    await this.page
      .locator('h6:has-text("Dashboard")')
      .waitFor({ state: "visible", timeout: 120000 });
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
    // wait for success message
    await this.page
      .locator('div:has-text("Successfully Saved")')
      .waitFor({ state: "visible", timeout: 60000 });
  }

  async searchEmployee(name) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
    await this.page
      .locator(`td:has-text("${name}")`)
      .waitFor({ state: "visible", timeout: 60000 });
  }

  async editEmployee(newFirstName, newLastName) {
    await this.editButton.waitFor({ state: "visible", timeout: 60000 });
    await this.editButton.click();
    await this.firstNameInput.fill(newFirstName);
    await this.lastNameInput.fill(newLastName);
    await this.saveButton.click();
    await this.page
      .locator('div:has-text("Successfully Updated")')
      .waitFor({ state: "visible", timeout: 60000 });
  }

  async deleteEmployee() {
    await this.deleteButton.waitFor({ state: "visible", timeout: 60000 });
    await this.deleteButton.click();
    await this.confirmDeleteButton.waitFor({
      state: "visible",
      timeout: 60000,
    });
    await this.confirmDeleteButton.click();
    await this.page
      .locator('div:has-text("Successfully Deleted")')
      .waitFor({ state: "visible", timeout: 60000 });
  }
}
