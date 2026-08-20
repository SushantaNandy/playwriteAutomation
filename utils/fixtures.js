const base = require('@playwright/test')
const {APIutils} = require('./APIutils.js')
const {request} = require('@playwright/test');
const loginPayload = {userEmail: "nandysushanta9@gmail.com", userPassword: "Santosh@3155"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};


exports.customeTest = base.test.extend(
{
authenticatedPage : async({browser}, use)=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const emailField = page.locator("#userEmail");
    const passwordField = page.locator("#userPassword");
    const loginBtn = page.locator("[type ='submit']");

    await emailField.fill("nandysushanta9@gmail.com");
    await passwordField.fill("Santosh@3155");
    await loginBtn.click();

    await page.waitForLoadState('networkidle');
    await use(page);
// tear down --> to close the browser
    await context.close();
},

createOrder : async({}, use) => {

    const apiContext = await request.newContext();
    
    //creating an object of APIutils class
    const apiUtils = new APIutils(apiContext, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);
//tear down --> to close the api calls to avoid leak
    await apiContext.dispose();

},

testDataForOrder : {
    productName : 'Apple Mac Book'
}

}

)