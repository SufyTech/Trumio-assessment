// pages/DashboardPage.js
import { expect } from "@playwright/test";

export default class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.locator(
      'p:has-text("Logout"), a:has-text("Logout")',
    );
  }

  async waitForDashboard() {
    // Wait for Dashboard page to load
    await this.page.waitForSelector(
      'p:has-text("Dashboard"), h6:has-text("Dashboard")',
      { timeout: 90000 },
    );
  }

  async logout() {
    await this.logoutButton.waitFor({ state: "visible", timeout: 90000 });
    await this.logoutButton.click();
    await this.page.waitForURL(/auth\/login/, { timeout: 90000 });
    console.log("✅ Logged out successfully");
  }
}
