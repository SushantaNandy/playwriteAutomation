const {test, expect} = require('@playwright/test');

test.describe.configure({mode:'serial'});

//shared variable
let page;
let userEmail='sushantanandy@gmail.com';
let productToSearch = 'iphone 13 pro';
let webContext;

test.beforeAll(async ({browser})=>{
// Create a single context and page once for this file
    const context = await browser.newContext();
    page = await context.newPage();



    await page.goto("https://rahulshettyacademy.com/client");
    const emailField = page.locator("#userEmail");
    const passwordField = page.locator("#userPassword");
    const loginBtn = page.locator("[type ='submit']");

    await emailField.fill(userEmail);
    await passwordField.fill("Santosh@3155");
    await loginBtn.click();
    await page.waitForLoadState('networkidle');

    //On browser level we are setting up the context not on the page level
    await context.storageState({path: 'state.json'});

    webContext = await browser.newContext({storageState: 'state.json'});

})



test('Validate DashBord Product Selection', async()=>
    {

    page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    
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