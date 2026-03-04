// pages/EmployeePage.js
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
  }

  async addEmployee(firstName, lastName, employeeId) {
    await this.addButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(employeeId);
    await this.saveButton.click();
  }

  async searchEmployee(nameOrId) {
    await this.searchInput.fill(nameOrId);
    await this.searchButton.click();
  }

  async editEmployee(firstName, lastName) {
    await this.editButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }

  async deleteEmployee() {
    await this.deleteButton.click();
    await this.page.locator('button:has-text("Confirm")').click();
  }
}
