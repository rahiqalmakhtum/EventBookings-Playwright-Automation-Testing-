import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.getByText('Greetings!');
        this.loginPageHeader = page.getByRole('heading', { name: 'Log in' });
        this.dropdownToggle = page.locator('a[aria-label="SignIn"]');
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.submitButton = page.getByRole('button', { name: /log in/i });
        this.emailError = page.locator('#Email-error');
        this.passwordError = page.locator('#Password-error');
        this.wrongEmailOrPass = page.locator('div.error-msg.validation-summary-errors');

    }

    async clickDropDownBtn() {
        await this.signInButton.waitFor({ state: 'visible', timeout: 3000 });
        await this.signInButton.click();
    }

    async navigateToLogin() {
        await this.dropdownToggle.waitFor({ state: 'visible', timeout: 3000 });
        await this.dropdownToggle.click();
    }

    async validateLoginPage() {
        await expect(this.loginPageHeader).toBeVisible({ timeout: 3000 });
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.page.waitForTimeout(3000);
        await this.submitButton.click();
    }

    async emptyLogin(){
        await this.page.waitForTimeout(3000); 
        await this.submitButton.click();
    }

    async validateInvalidInput() {
        await expect(this.emailError).toBeVisible();
    }

    async validateWrongEmailOrPass() {
        await this.page.waitForTimeout(3000);
        await expect(this.wrongEmailOrPass).toBeVisible();
    }
}
