import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

export class ProposalPage extends PageBase {

    private txtProjectTitle: Locator = this.page.locator('#react-project-title')
    private txtStartDate: Locator = this.page.locator('#react-project-start_date')
    private txtEndDate: Locator = this.page.locator('#react-project-end_date')
    private txtProjectDescription: Locator = this.page.locator('#react-project-description')

    private ddlActivity: Locator = this.getDropdown('react-select-project-activity--value')
    private ddlTargetMarket: Locator = this.getDropdown('react-select-project-primary_market--value')

    private rdIsexpandingOutside: Locator;

    private btnSave: Locator = this.page.locator('#save-btn')
    private lblSuccessMsg: Locator = this.page.locator('.growl-title')
    private btnNext: Locator = this.page.locator('#next-btn')
    private lblBusinessImpactHeading: Locator = this.page.locator('h2', { hasText: 'Explain The Business Impact' })

    constructor(page: Page) {
        super(page)
    }

    private getDropdown(locatorId: string): Locator {
        return this.page.locator(`#${locatorId} input[role="combobox"]`);
    }

    // Dynamically Create Locator
    private getIsExpandingOutsideLocator(option: string): Locator {
        return this.page
            .locator('div.form-group:has-text("expanding into a target market outside Singapore?")')
            .getByRole('radio', { name: option });
    }

    async fillProposalSection(projTitle: string, startDate: number, endDate: number, projDescription: string,  activity: string, targetMarket: string, isExpand: string) {
        await this.txtProjectTitle.fill(projTitle)

        const startDateString = await this.getDate(startDate);
        const formattedStartDate = await this.formatDate(startDateString)
        await this.txtStartDate.fill(formattedStartDate)

        const endDateString = await this.getDate(endDate);
        const formattedEndDate = await this.formatDate(endDateString)
        await this.txtEndDate.fill(formattedEndDate)

        await this.txtProjectDescription.fill(projDescription)

        await this.searchAndSelectDropdown(this.ddlActivity, activity)
        await this.searchAndSelectDropdown(this.ddlTargetMarket, targetMarket)
       
        this.rdIsexpandingOutside = this.getIsExpandingOutsideLocator(isExpand)
        await this.rdIsexpandingOutside.click()
        await expect(this.rdIsexpandingOutside).toBeChecked();
    }

    async clickSave() {
        await this.btnSave.click()
        expect(await this.lblSuccessMsg.first().textContent()).toEqual('Draft Saved')
    }

    async navigateIntoBusinessImpact() {
        await this.btnNext.click()
        await this.lblBusinessImpactHeading.waitFor({ state: 'visible' })
        expect(await this.lblBusinessImpactHeading.isVisible()).toBeTruthy()
    }

}