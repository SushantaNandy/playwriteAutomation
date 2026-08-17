const {test, expect} = require('@playwright/test')

test("popup validations", async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('http://google.com/');
    // await page.goBack();
    // await page.goForward();

    //visiblity of elements
    await expect(page.locator("#displayed-text")).toBeHidden;
    await page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeVisible;
    

    //alert dialougs
    await page.locator("#confirmbtn").click();
    page.on('dialog', dialog=> dialog.accept);

    //mouse hover
    page.pause();
    await page.locator("#mousehover").hover();

    //frames switching
    const framePage = page.frameLocator("#courses-iframe");
    // await framePage.locator("li a[href*='lifetime-access']:visible").click();
    // await framePage.goBack();
    const textCheck = await framePage.locator(".count-outer span").textContent();
    console.log(textCheck)

})