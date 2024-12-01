import { Page, Locator, expect } from "@playwright/test";
import path from 'path';

export class PageBase {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    /**
     * This function is used to wait for a specific number of seconds
     * @param timeInSeconds  number of seconds to wait
     */
    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

    /**
     * This function is used to get the current date in the format 'YYYY-MM-DD'
     * @param noOfDays  number of days to add to the current date
     * @returns date in the format 'YYYY-MM-DD'
     */
    async getDate(noOfDays: number) {
        let date = new Date()
        date.setDate(date.getDate() + noOfDays)
        return date.toISOString().split('T')[0];
    }

    /**
     * This function is used to extracts only numeric values from a given string.
     * @param value   string to extract numbers from.
     * @returns  string containing only the numeric characters.
     */
    extractNumericValues(value: string): string {
        return value.replace(/[^\d.]/g, ''); // Replace all characters except digits (0-9) and dot (.)
    }


    /**
     * This function is used to format a date from 'YYYY-MM-DD' to 'DD MMM YYYY'
     * @param date  date in the format 'YYYY-MM-DD'
     * @returns date in the format 'DD MMM YYYY'
     */
    async formatDate(date: string) {
        const timestamp = Date.parse(date);
        const dateObject = new Date(timestamp);
        const expectedDate = dateObject.getDate().toString().padStart(2,'0');
        const expectedMonth = dateObject.toLocaleString('en-US', { month: 'short' });
        const expectedYear = dateObject.getFullYear().toString();
        return `${expectedDate} ${expectedMonth} ${expectedYear}`;
    }


    /**
     * This function is used to search and select option frm dropdown
     * 
     * @param eleDropdown  locator for the dropdown input field.
     * @param option - option text to search and select from the dropdown.
     * 
     */
    async searchAndSelectDropdown(eleDropdown: Locator, option: string) {
        await eleDropdown.fill(option)

        const focusedOption = this.page.locator('.Select-option.is-focused');
        await focusedOption.waitFor({ state: 'visible' })
        const optionText = await focusedOption.textContent();

        if (optionText?.trim() == option) {
            await focusedOption.click()
        }
        else {
            console.error(`Option ${option} not found`);
            throw new Error(`Dropdown option ${option} is not selected`);
        }
    }

    /**
     * This function is used to upload file
     * @param filePath  directory of the file
     * @param fileName  file name
     * @param fileInput file input locator
     */
    async uploadFile(filePath: string, fileName: string, fileInput: Locator) {

        filePath = path.resolve(__dirname, filePath);
        await fileInput.setInputFiles(filePath);
        const uploadedFileName = await this.page.locator('.upload-success').textContent();
        expect(uploadedFileName).toContain(fileName);
    }

    /**
     * This function is used to open a new tab via a link
     * @param linkLocator  locator of the link to click
     * @param headerLocator  locator of the header of the new page 
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