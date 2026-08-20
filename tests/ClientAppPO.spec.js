const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
/**
 * Convert the Json --> String --> Js Object to remove any UTF-8 file error
 */
const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

test.describe.configure({mode:'serial'});

for(const data of dataset){

//shared variable
/**@type {import('@playwright/test').Page}*/
let page;
/**@type {POManager}*/
let poManager;

test.beforeAll(async ({browser})=>{
// Create a single context and page once for this file
    const context = await browser.newContext();
    page = await context.newPage();
    poManager = new POManager(page);

})



test(`Validate Login Test for ${data.username}`, async ()=>
{
    const loginPage = poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(data.username, data.password);

    
});

test(`Validate DashBord Product Selection for ${data.username}`, async()=>
    {
    
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(data.productToSearch);
    await dashboardPage.navigateToCart();
    
})


test(`Validate Cart for ${data.username}`, async()=>
    {

        const cartBtn = page.locator("[routerlink*='cart']");
        const checkoutBtn = page.locator("text = Checkout");

        await cartBtn.click();
        //wait until that particular page's tag (element) loaded up
        await page.locator("div ul").first().waitFor(); 
        const bool = await page.locator(`h3:has-text("${data.productToSearch}")`).isVisible();
        expect(bool).toBeTruthy();
        await checkoutBtn.click();

})

test(`Validate Checkout Page for ${data.username}`, async()=>{

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

    expect(emailInCheckOut).toHaveText(data.username);
    await placeOrderBtn.click();

})

test(`Validate the Place Page for ${data.username}`, async()=>{

    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderIds = page.locator(".em-spacer-1 .ng-star-inserted");

     //for(let i =0; i<=orderIds.count(); ++i){
        const orderId = await orderIds.textContent();
        console.log(`Order ids are:  ${orderId}`);
    //}

})

test.afterAll(async ()=>{
    await page.close();
})
}