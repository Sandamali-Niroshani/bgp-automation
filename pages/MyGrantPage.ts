import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

export class MyGrantPage extends PageBase {
    private btnGetNewGrant: Locator = this.page.locator('.dashboard-action-title', { hasText: 'Get new grant' })
    private lblBusinessSector: Locator = this.page.getByText('Which sector best describes your business?')

    private processingTab: Locator = this.page.locator('//a[@href="#processing"]')
    private tableRefId: Locator = this.page.locator('//table[@id="db-apps-processing"]/tbody/tr/td[1]')
    private tableGrantType: Locator = this.page.locator('//table[@id="db-apps-processing"]/tbody/tr/td[2]')
    private tableAgency: Locator = this.page.locator('//table[@id="db-apps-processing"]/tbody/tr/td[3]')
    private tableProjectName: Locator = this.page.locator('//table[@id="db-apps-processing"]/tbody/tr/td[4]')

    constructor(page: Page) {
        super(page)
    }

    /** 
     * This method is to click on Get new grant button
    */
    async clickNewGrant() {
        await this.btnGetNewGrant.click()
        await this.lblBusinessSector.waitFor({ state: 'visible' });
        expect(await this.lblBusinessSector.isVisible()).toBeTruthy()
        expect
    }


    /**
     * This method is to verifies that a form is added to the processing tab.
     * 
     * @param referenceId - reference id of the form
     * @param grantType - grant type 
     * @param agency - agency 
     * @param projectName - project name
     * 
     */
    async verifyFormInProcessingTab(referenceId: string, grantType: string, agency: string, projectName: string) {
        await this.processingTab.click()
        await this.tableRefId.first().waitFor({ state: 'visible' });

        expect(await this.tableRefId.first().textContent()).toEqual(referenceId)
        expect(await this.tableGrantType.first().textContent()).toEqual(grantType)
        expect(await this.tableAgency.first().textContent()).toEqual(agency)
        expect(await this.tableProjectName.first().textContent()).toEqual(projectName)
    }

}