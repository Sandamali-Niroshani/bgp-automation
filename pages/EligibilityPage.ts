import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

export class EligibilityPage extends PageBase {
    readonly strHeaderGetGrantPage = '#get-a-grant'

    private rdRegisteredYes: Locator = this.page.locator('#react-eligibility-sg_registered_check-true')
    private rdRegisteredNo: Locator = this.page.locator('#react-eligibility-sg_registered_check-false')
    private rdTurnOver: Locator = this.page.locator('#react-eligibility-turnover_check-true')
    private rdLocalEquityYes: Locator = this.page.locator('#react-eligibility-global_hq_check-true')
    private rdTargetMarketYes: Locator = this.page.locator('#react-eligibility-new_target_market_check-true')
    private rdStartProjYes: Locator = this.page.locator('#react-eligibility-started_project_check-true')
    private btnSave: Locator = this.page.locator('#save-btn')
    private lblSuccessMsg: Locator = this.page.locator('.growl-title')
    private btnNext: Locator = this.page.locator('#next-btn')
    private lblContactDetailHeading: Locator = this.page.locator('h2', { hasText: 'Provide Your Contact Details' })
    private warningText: Locator = this.page.locator('.field-warning-text')
    private lnkFAQ: Locator = this.page.locator('.field-warning-text').locator('role=link', { hasText: 'FAQ' })


    constructor(page: Page) {
        super(page)
    }

    async fillEligibilitySection() {
        await this.rdRegisteredYes.click()
        await this.rdTurnOver.click()
        await this.rdLocalEquityYes.click()
        await this.rdTargetMarketYes.click()
        await this.rdStartProjYes.click()
    }

    async verifyAnsweringNoForQuestionsAndOpenFAQ(warningMsg: string) {
        await this.rdRegisteredNo.click()
        expect(await this.warningText.textContent()).toEqual(warningMsg)

        await this.openNewTabViaLink(this.lnkFAQ, this.strHeaderGetGrantPage)
    }

    async clickSave() {
        await this.btnSave.click()
        expect(await this.lblSuccessMsg.textContent()).toEqual('Draft Saved')
    }

    async navigateIntoContactDetails() {
        await this.btnNext.click()
        await this.lblContactDetailHeading.waitFor({ state: 'visible' })
        expect(await this.lblContactDetailHeading.isVisible()).toBeTruthy()
    }

}