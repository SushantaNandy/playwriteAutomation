// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Flow Validations', () => {
  
  test('should log in successfully with valid credentials', async ({ page }) => {
    // 1. Initialize the Page Object
    const loginPage = new LoginPage(page);

    // 2. Navigate to the page
    await loginPage.goto();

    // 3. Perform the login action
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // 4. Assertions (Verify successful login)
    // The web application redirects to /secure upon success
    await expect(page).toHaveURL(/.*secure/);
    await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('wrongUser', 'wrongPassword');

    // Assertions (Verify failure state)
    // The URL should not change to /secure
    await expect(page).not.toHaveURL(/.*secure/);
    await expect(loginPage.flashMessage).toContainText('Your username is invalid!');
  });

});