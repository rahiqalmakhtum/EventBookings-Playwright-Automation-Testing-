import { test } from '@playwright/test';
import dotenv from 'dotenv';
import { BasePage } from '../pages/BasePage';
import { SignupPage } from '../pages/SignupPage';
import { LoginPage } from '../pages/LoginPage';

dotenv.config();

function generateTestData() {
  if (!process.env.BASE_EMAIL) throw new Error('BASE_EMAIL env var not defined!');

  const timestamp = Date.now();
  const [emailPrefix, emailDomain] = process.env.BASE_EMAIL.split('@');

  return {
    email: `${emailPrefix}+${timestamp}@${emailDomain}`,
    password: `${process.env.BASE_PASSWORD || 'DefaultPass'}${timestamp % 1000}`,
    firstName: 'Test',
    lastName: 'Name'
  };
}

test('Signup Flow', async ({ page }) => {
  const homePage = new BasePage(page);
  const signupPage = new SignupPage(page);

  const testData = generateTestData();
  console.log(`Generated credentials: ${testData.email} / ${testData.password}`);

  await homePage.navigate();
  await signupPage.navigateToSignup();
  await signupPage.validateSignupPage();

  await signupPage.fillSignupForm(testData.firstName, testData.lastName, testData.email, testData.password, testData.password);
  await signupPage.submitSignup();

  
});

test('Login with empty form submission', async ({page}) => {
  const homePage = new BasePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigate();
  await loginPage.clickDropDownBtn();
  await loginPage.navigateToLogin();
  await loginPage.validateLoginPage();

  await loginPage.emptyLogin();
  
  await loginPage.validateInvalidInput();

})

test('Login with invalid email format', async ({page}) => {
  const homePage = new BasePage(page);
  const loginPage = new LoginPage(page);

  const testData = generateTestData();

  await homePage.navigate();
  await loginPage.clickDropDownBtn();
  await loginPage.navigateToLogin();
  await loginPage.validateLoginPage();

  await loginPage.login('abc.com', testData.password);
  
  await loginPage.validateInvalidInput();

})

test('Login with wrong password', async ({page}) => {
  const homePage = new BasePage(page);
  const loginPage = new LoginPage(page);

  const testData = generateTestData();

  await homePage.navigate();
  await loginPage.clickDropDownBtn();
  await loginPage.navigateToLogin();
  await loginPage.validateLoginPage();

  await loginPage.login('rahiq@gmail.com', testData.password);
  
  await loginPage.validateWrongEmailOrPass();

})

test('Login with valid credentials', async ({page}) => {
  const homePage = new BasePage(page);
  const loginPage = new LoginPage(page);

  const testData = generateTestData();

  await homePage.navigate();
  await loginPage.clickDropDownBtn();
  await loginPage.navigateToLogin();
  await loginPage.validateLoginPage();

  await loginPage.login('rahiq123@gmail.com','Rahiq123@321');
  
  await page.waitForTimeout(1000); 

})