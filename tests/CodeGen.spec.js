import { test, expect } from '@playwright/test';

//npx playwright codegen https://rahulshettyacademy.com/angularpractice/
//npx playwright test SpecialLocator.spec.js --debug
//npx playwright test --ui

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/');
  await expect(page.locator('h1')).toContainText('Protractor Tutorial');
  await page.getByText('Protractor Tutorial by').click();
  await page.locator('form input[name="name"]').click();
  await page.locator('form input[name="name"]').press('CapsLock');
  await page.locator('form input[name="name"]').fill('Sushanta ');
  await page.locator('form input[name="name"]').press('CapsLock');
  await page.locator('form input[name="name"]').fill('Sushanta Nandy');
  await page.locator('form input[name="name"]').press('Enter');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('nandysushanta9@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Password' }).fill('Santosh@3155');
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
  await page.getByLabel('Gender').selectOption('Female');
  await page.getByRole('radio', { name: 'Student' }).check();
  await page.locator('input[name="bday"]').fill('1997-01-18');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('form-comp')).toContainText('× Success! The Form has been submitted successfully!.');
  await page.getByRole('link', { name: 'Shop' }).click();
  await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  await page.getByText('Checkout ( 2 ) (current)').click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByText('I agree with the term &').click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Please choose your delivery' }).fill('Gurugram');
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.locator('app-checkout')).toContainText('× Success! Thank you! Your order will be delivered in next few weeks :-).');
  await page.getByRole('button', { name: 'Purchase' }).click();
  await page.getByText('Please choose your delivery').click();
  await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  await page.getByRole('button', { name: 'Purchase' }).click();
  await expect(page.getByText('× Success! Thank you! Your')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('Gurugram');
});