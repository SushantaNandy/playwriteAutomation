const {test, expect} = require('@playwright/test');

test('Calender Action', async({page})=>{

    const date = "18";
    const month = "1";
    const year = "2027";

    const expectedList = [month, date, year];

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__tile').nth(Number(month)-1).click();
    await page.getByText(Number(date)).click();
    const input = page.locator('.react-date-picker__inputGroup__input');

    for(let i=0; i< expectedList.length; i++){
        const value = await input.nth(i).getAttribute('value');
        expect(value).toEqual(expectedList[i]);

    }

})