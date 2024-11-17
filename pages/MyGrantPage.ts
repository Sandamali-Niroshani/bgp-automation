import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

export class MyGrantPage extends PageBase {
    private btnGetNewGrant: Locator = this.page.locator('.dashboard-action-title', { hasText: 'Get new grant' })
    private lblBusinessSector: Locator = this.page.getByText('Which sector best describes your business?')

    constructor(page: Page) {
        super(page)
    }

    async clickNewGrant() {
        await this.btnGetNewGrant.click()
        await this.lblBusinessSector.waitFor({ state: 'visible' });
        expect(await this.lblBusinessSector.isVisible()).toBeTruthy()
    }

}