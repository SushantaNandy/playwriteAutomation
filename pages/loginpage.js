class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Using user-facing locators (Best Practice)
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: /login/i });
    
    // Locator for the success/error banner
    this.flashMessage = page.locator('#flash');
  }

  // Action to navigate to the page
  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  // Action to perform the login sequence
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };