const {test, expect} = require('@playwright/test');

test.describe.configure({mode:'serial'});

//shared variable
let page;
let userEmail;
let productToSearch = 'iphone 13 pro';

test.beforeAll(async ({browser})=>{
// Create a single context and page once for this file
    const context = await browser.newContext();
    page = await context.newPage();

})

test("security testing fundamental", async () => {
    //Block the css files
    page.route('**/*.css', route=>route.abort());
    //to block the images 
    page.route('**/*.{jpg,png,jpeg}', route=>route.abort());
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const emailField = page.locator("#userEmail");
    const passwordField = page.locator("#userPassword");
    const loginBtn = page.locator("[type ='submit']");

    await emailField.fill("nandysushanta9@gmail.com");
    await passwordField.fill("Santosh@3155");
    await loginBtn.click();

    await page.waitForLoadState('networkidle');

    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
     route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a7cb1b185b8849b494578d5' })
    )

    await page.locator("button:has-text('View')").first().click();
    await page.pause();
})