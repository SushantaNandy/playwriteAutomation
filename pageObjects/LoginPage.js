class LoginPage{

    constructor(page){
        this.page = page;
        this.emailField = page.locator("#userEmail");
        this.passwordField = page.locator("#userPassword");
        this.loginBtn = page.locator("[type ='submit']");

    }

    async goto(){
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async vaidLogin(username, password){
    await emailField.fill(userEmail);
    await passwordField.fill(password);
    await loginBtn.click();
    }
}

module.exports = {LoginPage}