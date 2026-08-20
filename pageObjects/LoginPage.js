class LoginPage{
    constructor(page){
        this.page= page;
        this.LoginBtn = page.locator("input#login");
        this.EmailField = page.locator("#userEmail");
        this.PasswordField = page.locator("#userPassword");
    }

    async goto(){
        this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(username, password){
        
        await this.EmailField.fill(username);
        await this.PasswordField.fill(password);
        await this.LoginBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage};