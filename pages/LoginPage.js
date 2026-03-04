// pages/LoginPage.js
export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.dashboardLink = page.locator(
      'a[href="/web/index.php/dashboard/index"]',
    );
    this.errorMsg = page.locator(".oxd-alert-content-text");
  }

  async navigate() {
    await this.page.context().clearCookies();
    await this.page.goto("/web/index.php/auth/login", {
      waitUntil: "networkidle",
    });
    await this.usernameInput.waitFor({ state: "visible", timeout: 30000 });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async waitForDashboard() {
    await this.dashboardLink.waitFor({ state: "visible", timeout: 30000 });
  }

  async waitForError() {
    await this.errorMsg.waitFor({ state: "visible", timeout: 15000 });
  }
}
