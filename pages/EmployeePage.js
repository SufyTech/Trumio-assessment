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
    this.tableRows = page.locator("table tbody tr"); // for waiting search results
  }

  async addEmployee(firstName, lastName, employeeId) {
    await this.addButton.waitFor({ state: "visible", timeout: 60000 });
    await this.addButton.click();

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(employeeId);

    await this.saveButton.click();
    // Wait for the table to update after adding
    await this.tableRows.first().waitFor({ state: "visible", timeout: 60000 });
  }

  async searchEmployee(nameOrId) {
    await this.searchInput.fill(nameOrId);
    await this.searchButton.click();

    // Wait for at least one row to appear
    await this.tableRows.first().waitFor({ state: "visible", timeout: 60000 });
  }

  async editEmployee(firstName, lastName) {
    await this.editButton.click();

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    await this.saveButton.click();
    await this.tableRows.first().waitFor({ state: "visible", timeout: 60000 });
  }

  async deleteEmployee() {
    await this.deleteButton.click();
    await this.confirmDeleteButton.click();

    // Wait until at least the first row disappears or table updates
    await this.page.waitForTimeout(1000); // small pause to allow delete to reflect
    await this.tableRows
      .first()
      .waitFor({ state: "visible", timeout: 60000 })
      .catch(() => {});
  }
}
