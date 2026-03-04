class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator('p:has-text("Logout")'); // adjust selector
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = DashboardPage;
