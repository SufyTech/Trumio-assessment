// pages/EmployeePage.js
export default class EmployeePage {
  constructor(page) {
    this.page = page;
    this.addButton = page.locator('button:has-text("Add")');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input[name="employeeId"]');
    this.saveButton = page.locator('button:has-text("Save")');
    this.searchInput = page.locator('input[placeholder="Type for hints..."]');
    this.searchButton = page.locator('button:has-text("Search")');
    this.editButton = page.locator('button:has-text("Edit")');
    this.deleteButton = page.locator('button:has-text("Delete")');
    this.confirmDeleteButton = page.locator('button:has-text("Yes, Delete")');
  }

  async addEmployee(firstName, lastName, employeeId) {
    await this.addButton.waitFor({ state: "visible", timeout: 60000 });
    await this.addButton.click();

    await this.firstNameInput.waitFor({ state: "visible", timeout: 60000 });
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(employeeId);

    await this.saveButton.waitFor({ state: "visible", timeout: 60000 });
    await this.saveButton.click();

    // Wait for the new employee to appear in the list
    await this.page.waitForLoadState("networkidle");
  }

  async searchEmployee(nameOrId) {
    await this.searchInput.waitFor({ state: "visible", timeout: 60000 });
    await this.searchInput.fill(nameOrId);

    await this.searchButton.waitFor({ state: "visible", timeout: 60000 });
    await this.searchButton.click();

    await this.page.waitForSelector("table tbody tr", { timeout: 60000 });
  }

  async editEmployee(firstName, lastName) {
    await this.editButton.waitFor({ state: "visible", timeout: 60000 });
    await this.editButton.click();

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();

    await this.page.waitForLoadState("networkidle");
  }

  async deleteEmployee() {
    await this.deleteButton.waitFor({ state: "visible", timeout: 60000 });
    await this.deleteButton.click();

    await this.confirmDeleteButton.waitFor({
      state: "visible",
      timeout: 60000,
    });
    await this.confirmDeleteButton.click();

    await this.page.waitForLoadState("networkidle");
  }
}
