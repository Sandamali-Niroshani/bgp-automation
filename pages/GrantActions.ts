import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

export class GrantActions extends PageBase {
    private btnProceed: Locator = this.page.locator('#keyPage-form-button')
    private lblEligibilityPage:Locator = this.page.locator('h2', {hasText:'Check Your Eligibility'})

    constructor(page: Page) {
        super(page)
    }

    async clickProceed() {
        await this.btnProceed.click()
        await this.waitForNumberOfSeconds(1)
        expect(await this.lblEligibilityPage.isVisible()).toBeTruthy()
    }

}