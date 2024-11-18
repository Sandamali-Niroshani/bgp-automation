import { Page, Locator, expect } from "@playwright/test";

export class PageBase {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    /**
     * This function is used to wait for a specific number of seconds
     * @param timeInSeconds - number of seconds to wait
     */
    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }


    /**
     * This function is used to open a new tab via a link
     * @param linkLocator - locator of the link to click
     * @param headerLocator - locator of the header of the new page 
     */
    async openNewTabViaLink(linkLocator: Locator, headerLocator: string) {
        try {
            // Start listening for the new tab (popup event)
            const [newTab] = await Promise.all([
                this.page.waitForEvent('popup', { timeout: 20000 }), // Wait for the new tab to open
                linkLocator.click()
            ]);
            await newTab.waitForLoadState(); // Wait for the new tab to load completely

            // Verify the header of the new page
            expect(await newTab.locator(headerLocator).isVisible()).toBeTruthy();
        }
        catch (error) {
            console.error('Error waiting for popup:', error);
            throw error;
        }
    }

      /**
     * Generates a unique email address.
     * @returns A dynamically generated email address.
     */
       generateEmail(): string {
        const timestamp = Date.now();
        const randomPart = Math.floor(Math.random() * 10000);
        return `testUser${timestamp}${randomPart}@gmail.com`;
    }
}