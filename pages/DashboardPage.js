// pages/DashboardPage.js
export default class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator(
      'p:has-text("Logout"), a:has-text("Logout")',
    );
  }

  async logout() {
    await this.logoutButton.waitFor({ state: "visible", timeout: 90000 });
    await this.logoutButton.click();
    await this.page.waitForURL(/auth\/login/, { timeout: 90000 });
    console.log("✅ Logged out successfully");
  }
}
