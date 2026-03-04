// pages/DashboardPage.js
export default class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator('p:has-text("Logout")');
  }

  async logout() {
    await this.logoutButton.click();
  }
}
