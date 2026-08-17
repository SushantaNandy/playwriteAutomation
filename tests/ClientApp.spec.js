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

    const timeStamp = Date.now();
    userEmail = `sushanta_${timeStamp}@test.com`;

})

test('Validate Regestaration Test', async ()=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");

    const regrationBtn = page.locator(".btn1").first();
    const firstNameField = page.locator("#firstName");
    const lastNameField = page.locator("#lastName");
    const emailField = page.locator("#userEmail");
    const phoneNumberField = page. locator("#userMobile");
    const dropdown = page.locator(".custom-select");
    const radioBtn = page.locator("input.mt-3");
    const passwordField = page.locator("#userPassword");
    const cnfPasswordField = page.locator("#confirmPassword");
    const checkBox = page.locator("[type= 'checkbox']");
    const loginBtn = page.locator("input#login");
    const loginBtnAfterReg = page.locator(".btn-primary");


    await regrationBtn.click();
    await firstNameField.fill("Sushanta");
    await lastNameField.fill("Nandy");
    await emailField.fill(userEmail);
    await phoneNumberField.fill("7488611163");
    await dropdown.selectOption("Engineer");
    await radioBtn.nth(0).click();
    await passwordField.fill("Santosh@3155");
    await cnfPasswordField.fill("Santosh@3155");
    await checkBox.click();
    await loginBtn.click();
    await loginBtnAfterReg.click();
    console.log(`User regration mail: ${userEmail}`);
    // await page.pause();
    

});

test('Validate Login Test', async ()=>
{
    const emailField = page.locator("#userEmail");
    const passwordField = page.locator("#userPassword");
    const loginBtn = page.locator("[type ='submit']");

    await emailField.fill(userEmail);
    await passwordField.fill("Santosh@3155");
    await loginBtn.click();

    // await page.pause();
});

test('Validate DashBord Product Selection', async()=>
    {
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    const product = page.locator(".card-body");

    const count = await product.count();

    for(let i =0;i<count; ++i){
        if(await product.nth(i).locator('b').textContent() === productToSearch){
            await product.nth(i).locator("text = Add To Cart").click();
            break;
        }

    }
    
})


test('Validate Cart', async()=>
    {

        const cartBtn = page.locator("[routerlink*='cart']");
        const checkoutBtn = page.locator("text = Checkout");

        await cartBtn.click();
        //wait until that particular page's tag (element) loaded up
        await page.locator("div ul").first().waitFor(); 
        const bool = await page.locator(`h3:has-text("${productToSearch}")`).isVisible();
        expect(bool).toBeTruthy();
        await checkoutBtn.click();

})

test('Validate Checkout Page', async()=>{

    const shippingCountry = page.locator("[placeholder*='Country']");
    const conuntryDropdown = page.locator(".ta-results").first();
    const emailInCheckOut = page.locator(".user__name label");
    const placeOrderBtn = page.locator('.action__submit');

    await shippingCountry.pressSequentially("ind", {delay:150});
    await conuntryDropdown.waitFor();
    const optionCount = await conuntryDropdown.locator("button").count();


    for(let i=-0; i<optionCount; ++i){
        const countryText = await conuntryDropdown.locator("button").nth(i).textContent();
        if(countryText === ' India'){
            await conuntryDropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(emailInCheckOut).toHaveText(userEmail);
    await placeOrderBtn.click();

})

test('Validate the Place Page', async()=>{

    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderIds = page.locator(".em-spacer-1 .ng-star-inserted");

     //for(let i =0; i<=orderIds.count(); ++i){
        const orderId = await orderIds.textContent();
        console.log(`Order ids are:  ${orderId}`);
    //}

    await page.pause();
})

test.afterAll(async ()=>{
    await page.close();
})