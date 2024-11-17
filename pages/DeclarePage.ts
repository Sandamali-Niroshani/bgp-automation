import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

const PARAMETER = "parameter"
export class DeclarePage extends PageBase {

    readonly strCriminalCheck = 'react-declaration-criminal_liability_check'
    readonly strCivilProceedingCheck = 'react-declaration-civil_proceeding_check'
    readonly strInsolvencyCheck = 'react-declaration-insolvency_proceeding_check'
    readonly strProjectIncentivesCheck = 'react-declaration-project_incentives_check'
    readonly strOtherIncentivesCheck = 'react-declaration-other_incentives_check'
    readonly strProjectCommenceCheck = 'react-declaration-project_commence_check'
    readonly strRelatedPartyCheck = 'react-declaration-related_party_check'
    readonly strDebarmentCheck = 'react-declaration-debarment_check'

    private rdChriminalCheck: Locator;
    private rdCivilProceedingCheck: Locator;
    private rdInsolvencyCheck: Locator;
    private rdProjectIncentivesCheck: Locator;
    private rdOtherIncentivesCheck: Locator;
    private rdProjectCommenceCheck: Locator;
    private rdRelatedPartyCheck: Locator;
    private rdDebarmentCheck: Locator

    private lblConsentAndAcknowledge: Locator = this.page.locator('h2', { hasText: 'Consent & Acknowledgement' })
    private contentOfAcknowledgement: Locator = this.page.locator('#list-question')
    private acknowledgeCheckBox: Locator = this.page.locator('#react-declaration-consent_acknowledgement_check')

    private btnSave: Locator = this.page.locator('#save-btn')
    private lblSuccessMsg: Locator = this.page.locator('.growl-title')
    private btnReview: Locator = this.page.locator('#review-btn')
    private lblReviewApplHeading: Locator = this.page.locator('h3', { hasText: 'Review Your Application' })

    constructor(page: Page) {
        super(page)
    }


    private getRadioButtonLocator(sectionName: string, option: string): Locator {
        const radioButton = this.page
            .locator(`input[name="${sectionName}"]`)
            .getByRole('radio', { name: option });

        return radioButton;
    }


    async fillDeclareSection(criminalCheck: string, civilCheck: string, insolvencyCheck: string, projIncentivesCheck: string,
        otherIncentivesCheck: string, projCommenceCheck: string, relatedPartyCheck: string, debarmentCheck: string) {

        this.rdChriminalCheck = this.getRadioButtonLocator(this.strCriminalCheck, criminalCheck);
        await this.rdChriminalCheck.check()

        this.rdCivilProceedingCheck = this.getRadioButtonLocator(this.strCivilProceedingCheck, civilCheck);
        await this.rdCivilProceedingCheck.check()

        this.rdInsolvencyCheck = this.getRadioButtonLocator(this.strInsolvencyCheck, insolvencyCheck);
        await this.rdInsolvencyCheck.check()

        this.rdProjectIncentivesCheck = this.getRadioButtonLocator(this.strProjectIncentivesCheck, projIncentivesCheck);
        await this.rdProjectIncentivesCheck.check()

        this.rdOtherIncentivesCheck = this.getRadioButtonLocator(this.strOtherIncentivesCheck, otherIncentivesCheck);
        await this.rdOtherIncentivesCheck.check()

        this.rdProjectCommenceCheck = this.getRadioButtonLocator(this.strProjectCommenceCheck, projCommenceCheck);
        await this.rdProjectCommenceCheck.check()

        this.rdRelatedPartyCheck = this.getRadioButtonLocator(this.strRelatedPartyCheck, relatedPartyCheck);
        await this.rdRelatedPartyCheck.check()

        this.rdDebarmentCheck = this.getRadioButtonLocator(this.strDebarmentCheck, debarmentCheck);
        await this.rdDebarmentCheck.check()

    }

    async applicantAcknowledgement() {

        expect(await this.lblConsentAndAcknowledge.isVisible()).toBeTruthy()
        const contentText = await this.contentOfAcknowledgement.textContent();
        expect(contentText?.trim().length).toBeGreaterThan(0)
        await this.acknowledgeCheckBox.check()

    }

    async clickSave() {
        await this.btnSave.click()
        expect(await this.lblSuccessMsg.first().textContent()).toEqual('Draft Saved')
    }

    async navigateIntoReview() {
        await this.btnReview.click()
        await this.lblReviewApplHeading.waitFor({ state: 'visible' })
        expect(await this.lblReviewApplHeading.isVisible()).toBeTruthy()
    }

}