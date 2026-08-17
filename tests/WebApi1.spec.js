const {test, expect,request} = require('@playwright/test');
const{APIutils} = require('./utils/APIutils');

test.describe.configure({mode:'serial'});

//shared variable
let page;
let productToSearch = 'iphone 13 pro';
const loginPayload = {userEmail: "sushantanandy@gmail.com", userPassword: "Santosh@3155"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
let response;
let apiContext;



test.beforeAll(async({browser})=>{
    apiContext = await request.newContext();
    
    //creating an object of APIutils class
        const apiUtils = new APIutils(apiContext, loginPayload);

        response = await apiUtils.createOrder(orderPayload);

        const context = await browser.newContext();
        page = await context.newPage();

});



test('Validate Order Page', async()=>
    {
        //calling the methods created in the Utils class
        const apiUtils = new APIutils(apiContext, loginPayload);
        //const orderId =  createOrder(orderPayload);
        console.log(response.orderId);
        //js function to insert the token in local storage
        await page.addInitScript(value=>{
            window.localStorage.setItem('token',value);
        }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    

    const orderBtn = page.locator('[routerlink*="/dashboard/myorders"]');
    await orderBtn.click();
    //Take screen shot 
    await page.screenshot({path: 'screenshot.png'});
    //if I want to take screen shot of a particular web element
    await page.locator('.ng-star-inserted tr').screenshot({path: 'screenshot1.png'});
    
})


test.afterAll(async ()=>{
    await page.close();
})