import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../common/PageBase";

const PARAMETER = "parameter"
export class ReviewPage extends PageBase {

    private txtRegistered: Locator = this.page.locator('#react-eligibility-sg_registered_check')
    private txtTurnOver: Locator = this.page.locator('#react-eligibility-turnover_check')
    private txtLocalEquity: Locator = this.page.locator('#react-eligibility-global_hq_check')
    private txtTargetMarket: Locator = this.page.locator('#react-eligibility-new_target_market_check')
    private txtStartProject: Locator = this.page.locator('#react-eligibility-started_project_check')

    private finalAcknoledgementContent: Locator = this.page.locator('.bgp-summarydeclaration-containe')
    private checkboxFinalAcknowledge: Locator = this.page.locator('#react-declaration-info_truthfulness_check')
    private btnSubmit: Locator = this.page.locator('#submit-btn')

    private lblRefId: Locator = this.page.locator('//td[text()="Ref ID:"]/following-sibling::td[@class="value"]')
    private lblStatus: Locator = this.page.locator('//td[text()="Status:"]/following-sibling::td[@class="value"]')
    private lblAgencyName: Locator = this.page.locator('//td[text()="Agency Details:"]/following-sibling::td[@class="value"]/span')


    constructor(page: Page) {
        super(page)
    }

    async verifyEligibilitySection(registeredCheck: string, turnoverCheck: string, localEquityCheck: string, targetMarketCheck: string,
        startProjectCheck: string) {

        expect(await this.txtRegistered.textContent()).toEqual(registeredCheck)
        expect(await this.txtTurnOver.textContent()).toEqual(turnoverCheck) 
        expect(await this.txtLocalEquity.textContent()).toEqual(localEquityCheck)
        expect(await this.txtTargetMarket.textContent()).toEqual(targetMarketCheck)
        expect(await this.txtStartProject.textContent()).toEqual(startProjectCheck)
    }

    async finalAcknowledgementAndSubmitForm() {

        const contentText = await this.finalAcknoledgementContent.textContent();
        expect(contentText?.trim().length).toBeGreaterThan(0)
        await this.checkboxFinalAcknowledge.check()
        expect(await this.checkboxFinalAcknowledge.isChecked()).toBeTruthy()
        expect(await this.btnSubmit.isEnabled()).toBeTruthy()
        await this.btnSubmit.click()
    }

async verifySubmissionDetails(status: string, agencyName: string) {
        
        expect(await this.lblStatus.textContent()).toEqual(status)
        expect(await this.lblAgencyName.textContent()).toEqual(agencyName)
        
    }

    async getReferenceId(): Promise<string> {
        const referenceId = await this.lblRefId.textContent()

        if (!referenceId || referenceId.trim() === '') {
            throw new Error('Reference ID is not available or empty.');
          }
          
        return referenceId;
    }


}