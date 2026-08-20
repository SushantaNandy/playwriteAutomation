const{test, expect, request} = require('@playwright/test');
const{customeTest} = require('../utils/fixtures')

customeTest("Fixtures Demo", async({authenticatedPage, createOrder, testDataForOrder})=>{

await authenticatedPage.goto("https://rahulshettyacademy.com/client/#/dashboard/myorders");
const orderBtn = authenticatedPage.locator('[routerlink*="/dashboard/myorders"]');
await orderBtn.click();
await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
console.log(testDataForOrder.productName);

})
