const {test, expect,request} = require('@playwright/test')

test('visual test', async({page})=>{
await page.goto("https://playwright.dev/");
expect(await page.screenshot()).toMatchSnapshot('landingpage.png');
})