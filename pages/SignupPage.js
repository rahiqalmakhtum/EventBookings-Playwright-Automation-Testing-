import { expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class SignupPage extends LoginPage {
  constructor(page) {
    super(page);
    this.signupPageHeader = page.getByText('Create a free account now');
    this.dropdownToggle = page.locator('a[aria-label="SignUp"]');
    this.firstNameInput = page.getByPlaceholder('First name');
    this.lastNameInput = page.getByPlaceholder('Last name');
    this.emailInput = page.getByPlaceholder('Email address');
    this.passwordInput = page.locator("#Password");
    this.confirmPasswordInput = page.locator("#ConfirmPassword");
    this.submitButton = page.getByRole('button', { name: /sign up/i });
    this.logoutButton = page.getByText('Log out');
  }

  async navigateToSignup() {
    await super.clickDropDownBtn();
    await this.dropdownToggle.waitFor({ state: 'visible', timeout: 5000 });
    await this.dropdownToggle.click();
  }

  async validateSignupPage() {
    await expect(this.signupPageHeader).toBeVisible({ timeout: 5000 });
  }

  async fillSignupForm(firstName, lastName, email, password, confirmPassword) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(3000);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async submitSignup() {
    await this.submitButton.click();
  }

  async verifyUserLoggedIn() {
    await expect(this.logoutButton).toBeVisible({ timeout: 5000 });
  }

  async logout() {
    await this.logoutButton.click();
  }
}

