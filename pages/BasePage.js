import { expect } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('/'); // works only if baseURL is set
        await expect(this.page).toHaveTitle('Simple Event Ticketing System | EventBookings');
    }
}