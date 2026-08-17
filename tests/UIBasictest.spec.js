const {test, expect} = require('@playwright/test');

test('Browser Context demo test', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator('input#username');
    const signInBtn = page.locator("#signInBtn");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
   //css type, fill
   await username.fill("sushantanandy");
   await page.locator("[type = 'password']").fill("Learning@830$3mK2");
   await signInBtn.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText("Incorrect");

   await username.fill("");
   await username.fill("rahulshettyacademy");
   await signInBtn.click();

//    console.log(await page.locator(".card-body a").nth(0).textContent());
//    console.log(await page.locator(".card-body a").first().textContent());
//    console.log(await page.locator(".card-body a").last().textContent());

    //1st wait mechanish based on network call but flaky
    // await page.waitForLoadState('networkidle');

    //2nd wait mechanish 
    await page.locator(".card-body a").first().waitFor();

   const title = await page.locator(".card-body a").allTextContents();
   console.log(title);
});

test('first demo test', async ({page})=>
{
    await page.goto("https:google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");

});

test('UI Controls', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('input#username');
    const password = page.locator("[type = 'password']");
    const signInBtn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control"); 
    await dropdown.selectOption("Consultant");
    
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();

    console.log(await page.locator(".radiotextsty").nth(1).isChecked());
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();

    await page.locator("[type= 'checkbox']").click();
    await expect(page.locator("[type= 'checkbox']")).toBeChecked();
    await page.locator("[type= 'checkbox']").uncheck();
    expect(await page.locator("[type= 'checkbox']").isChecked()).toBeFalsy();

    const documentLink = page.locator(".blinkingText").nth(1);
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    //await page.pause();
});


test('Parent Child Window control', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator(".blinkingText").nth(0);
    const [newPage] = await Promise.all( 
        [context.waitForEvent('page')], // listen for new Page pending, rejected, fulfilled
        documentLink.click(),
    )
    console.log(await newPage.locator(".im-para").nth(1).textContent());

    const text = await newPage.locator(".im-para").nth(1).textContent();

    const arrayText = text.split("@");
    const targetEmail = arrayText[1].split(".")[0];

    console.log(targetEmail);

    await page.locator("input#username").fill(targetEmail);

    console.log(await page.locator("input#username").inputValue());

    await page.pause();

});