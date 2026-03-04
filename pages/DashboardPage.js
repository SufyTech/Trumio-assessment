// pages/DashboardPage.js
export default class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator(
      'p:has-text("Logout"), a:has-text("Logout")',
    ); // more flexible
    this.dashboardHeader = page.locator('h6:has-text("Dashboard")');
  }

  async waitForDashboard() {
    await this.page.waitForURL(/dashboard/, { timeout: 60000 });
    await this.dashboardHeader.waitFor({ state: "visible", timeout: 60000 });
  }

  async logout() {
    await this.logoutButton.waitFor({ state: "visible", timeout: 60000 });
    await this.logoutButton.click();
    await this.page.waitForURL(/auth\/login/, { timeout: 60000 });
  }
}
