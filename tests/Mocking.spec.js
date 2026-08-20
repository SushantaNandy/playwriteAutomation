const {test, expect,request} = require('@playwright/test');
const{APIutils} = require('../utils/APIutils');

test.describe.configure({mode:'serial'});

//shared variable
let page;
let productToSearch = 'iphone 13 pro';
const loginPayload = {userEmail: "sushantanandy@gmail.com", userPassword: "Santosh@3155"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const fakePayloadOrders = {data:[],message:"No Orders"};
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



test('@API Validate Order Page', async()=>
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
    
    //mocking starts from here
    //here I am using wild card * Wildcard URL (Glob Pattern Match)
    //await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 

    //catches the endpoint regardless of whether it's running on your local machine, staging, or production domain
    await page.route("*/**/api/ecom/order/get-orders-for-customer/*", 
    async route=>{
            //intercepting the response --> API Response -->{fake response / mock data} based on the response Browser render the data on frontend
            const response = await page.request.fetch(route.request());

            //Javascript object to JSON for browser to render
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill({
                response,
                body,
            })

        })

    //await page.pause();
    const orderBtn = page.locator('[routerlink*="/dashboard/myorders"]');
    await orderBtn.click();

    await page.waitForResponse("*/**/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());
    
})


test.afterAll(async ()=>{
    await page.close();
})