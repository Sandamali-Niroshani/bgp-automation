import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

export class Menu extends PageBase {
    private contactDetailsMenu: Locator = this.page.locator('.menu-text', { hasText: 'Contact Details' })
    private proposalMenu: Locator = this.page.locator('.menu-text', { hasText: 'Proposal' })
    private businessImpactMenu: Locator = this.page.locator('.menu-text', { hasText: 'Business Impact' })
    private costMenu: Locator = this.page.locator('.menu-text', { hasText: 'Cost' })
    private declareAndReview: Locator = this.page.locator('.menu-text', { hasText: 'Declare & Review' })

    private lnkMyGrant: Locator = this.page.getByRole('link', { name: 'My Grants' })
    private lblMyGrants: Locator = this.page.locator('h2', { hasText: 'my Grants' });

    private lblContactDetailHeading: Locator = this.page.locator('h2', { hasText: 'Provide Your Contact Details' })
    private lblProposalHeading: Locator = this.page.locator('h2', { hasText: 'Submit Your Proposal' })
    private lblBusinessImpactHeading: Locator = this.page.locator('h2', { hasText: 'Explain The Business Impact' })
    private lblCostHeading: Locator = this.page.locator('h2', { hasText: 'Provide Details of Costs' })
    private lblDeclareAndReviewHeading: Locator = this.page.locator('h2', { hasText: 'Declare & Acknowledge Terms' })

    constructor(page: Page) {
        super(page)
    }

    async navigateIntoContactDetails() {
        await this.contactDetailsMenu.click();
        await this.lblContactDetailHeading.waitFor({ state: 'visible' })
        expect(await this.lblContactDetailHeading.isVisible()).toBeTruthy()
    }

    async navigateIntoProposal() {
        await this.proposalMenu.click();
        await this.lblProposalHeading.waitFor({ state: 'visible' })
        expect(await this.lblProposalHeading.isVisible()).toBeTruthy()
    }

    async navigateIntoBusinessImpact() {
        await this.businessImpactMenu.click();
        await this.lblBusinessImpactHeading.waitFor({ state: 'visible' })
        expect(await this.lblBusinessImpactHeading.isVisible()).toBeTruthy()
    }

    async navigateIntoCost() {
        await this.costMenu.click();
        await this.lblCostHeading.waitFor({ state: 'visible' })
        expect(await this.lblCostHeading.isVisible()).toBeTruthy()
    }

    async navigateIntoDeclareAndReview() {
        await this.declareAndReview.click();
        await this.lblDeclareAndReviewHeading.waitFor({ state: 'visible' })
        expect(await this.lblDeclareAndReviewHeading.isVisible()).toBeTruthy()
    }

    async navigateIntoMyGrantPage() {
        await this.lnkMyGrant.click();
        await this.lblMyGrants.waitFor({ state: 'visible' })
        expect(await this.lblMyGrants.isVisible()).toBeTruthy()
    }

}