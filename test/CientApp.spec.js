const{test, expect} = require('@playwright/test')
const{LoginPage} = require('../pageObjects/LoginPage')

test('validate Client App Login', async ({page})=>{

const username = 'nandysushanta6@gmail.com';
const password = 'Santosh@3155';

const loginPage = new LoginPage(page);

loginPage.goto();
loginPage.vaidLogin(username, password);

});