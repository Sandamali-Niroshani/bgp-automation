import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

export class ReviewPage extends PageBase {

    private eligibilityMenu: Locator = this.page.locator('.menu-text', { hasText: 'Eligibility' })
    private lblEligibilityHeading: Locator = this.page.locator('h2', { hasText: 'Eligibility' })
    private txtRegistered: Locator = this.page.locator('#react-eligibility-sg_registered_check')
    private txtTurnOver: Locator = this.page.locator('#react-eligibility-turnover_check')
    private txtLocalEquity: Locator = this.page.locator('#react-eligibility-global_hq_check')
    private txtTargetMarket: Locator = this.page.locator('#react-eligibility-new_target_market_check')
    private txtStartProject: Locator = this.page.locator('#react-eligibility-started_project_check')

    private txtContactName: Locator = this.page.locator('#react-contact_info-name')
    private txtDesignation: Locator = this.page.locator('#react-contact_info-designation')
    private txtContactNumber: Locator = this.page.locator('#react-contact_info-phone')
    private txtEmail: Locator = this.page.locator('#react-contact_info-primary_email')
    private txtAddress: Locator = this.page.locator('#react-contact_info-correspondence_address')

    private txtOfferAddrName: Locator = this.page.locator('#react-contact_info-offeree_name')
    private txtOfferAddrDesignation: Locator = this.page.locator('#react-contact_info-offeree_designation')
    private txtOfferAddrEmail: Locator = this.page.locator('#react-contact_info-offeree_email')

    private txtProjTitle: Locator = this.page.locator('#react-project-title')
    private txtProjActivity: Locator = this.page.locator('#react-project-activity')
    private txtProjTargetMarket: Locator = this.page.locator('#react-project-primary_market')
    private txtProjExpand: Locator = this.page.locator('#react-project-is_first_time_expand')

    private txtOverseasSales: Locator = this.page.locator('//div[contains(@id,"react-project_impact-overseas_sales")]')
    private txtOverseasInvestments: Locator = this.page.locator('//div[contains(@id,"react-project_impact-overseas_investments")]')
    private txtRelationaleRemarks: Locator = this.page.locator('#react-project_impact-rationale_remarks')
    private txtBenefitsRemarks: Locator = this.page.locator('#react-project_impact-benefits_remarks')

    private txtName: Locator = this.page.locator('//div[contains(@id,"data_project_cost_salaries")]//div[contains(@id,"name")]')
    private txtProjectDesignation: Locator = this.page.locator('//div[contains(@id,"data_project_cost_salaries")]//div[contains(@id,"designation")]')
    private txtProjectRole: Locator = this.page.locator('//div[contains(@id,"data_project_cost_salaries")]//div[contains(@id,"role")]')
    private txtProjectInvolvement: Locator = this.page.locator('//div[contains(@id,"data_project_cost_salaries")]//div[contains(@id,"involvement_months")]')
    private txtSalaryInBillingCurrency: Locator = this.page.locator('//div[contains(@id,"data_project_cost_salaries")]//div[contains(@id,"billing_currency")]')
    private txtMonthlySalary: Locator = this.page.locator('//div[contains(@id,"data_project_cost_salaries")]//div[contains(@id,"monthly_salary")]')
    private txtEstimatedCost: Locator = this.page.locator('//div[contains(@id,"estimated_cost")]')
    private fileUploaded: Locator = this.page.locator('//div[contains(@id,"data_project_cost_salaries")]//tr[@class="upload-success"]')


    private txtCriminalCheck: Locator = this.page.locator('#react-declaration-criminal_liability_check')
    private txtCivilProceedingCheck: Locator = this.page.locator('#react-declaration-civil_proceeding_check')
    private txtInsolvencyCheck: Locator = this.page.locator('#react-declaration-insolvency_proceeding_check')
    private txtProjectIncentivesCheck: Locator = this.page.locator('#react-declaration-project_incentives_check')
    private txtOtherIncentivesCheck: Locator = this.page.locator('#react-declaration-other_incentives_check')
    private txtProjectCommenceCheck: Locator = this.page.locator('#react-declaration-project_commence_check')
    private txtRelatedPartyCheck: Locator = this.page.locator('#react-declaration-related_party_check')
    private txtDebarmentCheck: Locator = this.page.locator('#react-declaration-debarment_check')
    private txtConsentAndAcknowledge: Locator = this.page.locator('#react-declaration-consent_acknowledgement_check')

    private finalAcknoledgementContent: Locator = this.page.locator('.bgp-summarydeclaration-container')
    private checkboxFinalAcknowledge: Locator = this.page.locator('#react-declaration-info_truthfulness_check')
    private btnSubmit: Locator = this.page.locator('#submit-btn')

    private lblRefId: Locator = this.page.locator('//td[text()="Ref ID:"]/following-sibling::td[@class="value"]')
    private lblStatus: Locator = this.page.locator('//td[text()="Status:"]/following-sibling::td[@class="value"]')
    private lblAgencyName: Locator = this.page.locator('//td[text()="Agency Details:"]/following-sibling::td[@class="value"]/span[1]')


    constructor(page: Page) {
        super(page)
    }

    async verifyEligibilitySection(registeredCheck: string, turnoverCheck: string, localEquityCheck: string, targetMarketCheck: string,
        startProjectCheck: string) {

        await this.eligibilityMenu.click();
        await this.lblEligibilityHeading.waitFor({ state: 'visible' })
        expect(await this.lblEligibilityHeading.isVisible()).toBeTruthy()
        expect(await this.txtRegistered.textContent()).toEqual(registeredCheck)
        expect(await this.txtTurnOver.textContent()).toEqual(turnoverCheck)
        expect(await this.txtLocalEquity.textContent()).toEqual(localEquityCheck)
        expect(await this.txtTargetMarket.textContent()).toEqual(targetMarketCheck)
        expect(await this.txtStartProject.textContent()).toEqual(startProjectCheck)
    }

    async verifyContactDetailsSection(contactName: string, designation: string, contactNumber: string, street: string, postalCode: string, building: string,
        offerAddrName: string, offerAddrDesignation: string) {

        expect(await this.txtContactName.textContent()).toEqual(contactName)
        expect(await this.txtDesignation.textContent()).toEqual(designation)
        expect(await this.txtContactNumber.textContent()).toEqual(contactNumber)
        expect(await this.txtAddress.textContent()).toContain(street)
        expect(await this.txtAddress.textContent()).toContain(postalCode)
        expect(await this.txtAddress.textContent()).toContain(building)
        expect(await this.txtOfferAddrName.textContent()).toEqual(offerAddrName)
        expect(await this.txtOfferAddrDesignation.textContent()).toEqual(offerAddrDesignation)
    }

    async verifyProposalDetailsSection(projectTitle: string, projectActivity: string, projectTargetMarket: string, projectExpand: string) {

        expect(await this.txtProjTitle.textContent()).toEqual(projectTitle)
        expect(await this.txtProjActivity.textContent()).toEqual(projectActivity)
        expect(await this.txtProjTargetMarket.textContent()).toEqual(projectTargetMarket)
        expect(await this.txtProjExpand.textContent()).toEqual(projectExpand)
    }

    async verifyBusinessImpactSection(overseasSales: string, overseasInvestments: string, relationalRemarks: string, benefitsRemarks: string) {

        await this.verifyOverseasSales(overseasSales)
        await this.verifyOverseasInvestments(overseasInvestments)
        expect(await this.txtRelationaleRemarks.textContent()).toEqual(relationalRemarks)
        expect(await this.txtBenefitsRemarks.textContent()).toEqual(benefitsRemarks)
    }

    private async verifyOverseasSales(sales: string) {
        const arrOverseasSales = await this.txtOverseasSales.all();
        const arrSales = sales.split(',');
        this.waitForNumberOfSeconds(1)
        console.log("arrSales:", arrSales)

        for (let i = 0; i < arrSales.length; i++) {
            let actualOverSeasSale = await arrOverseasSales[i].textContent()

            if (actualOverSeasSale) {
                actualOverSeasSale = actualOverSeasSale.replace(/,/g, '')
            }
            console.log('actualOverSeasSale:', actualOverSeasSale);

            const expectedOverSeasSale = arrSales[i]
            expect(Number(actualOverSeasSale)).toEqual(Number(expectedOverSeasSale))
        }
    }

    private async verifyOverseasInvestments(investments: string) {
        const arrOverseasInvestments = await this.txtOverseasInvestments.all();
        const arrInvestments = investments.split(',');
        await this.waitForNumberOfSeconds(1)
        console.log("arrInvestments:", arrInvestments)

        for (let i = 0; i < arrInvestments.length; i++) {
            let actualOverSeaInvestment = await arrOverseasInvestments[i].textContent()

            if (actualOverSeaInvestment) {
                actualOverSeaInvestment = actualOverSeaInvestment.replace(/,/g, '')
            }
            console.log('actualOverSeaInvestment:', actualOverSeaInvestment);
            const expectedOverSeasInvestment = arrInvestments[i]
            expect(Number(actualOverSeaInvestment)).toEqual(Number(expectedOverSeasInvestment))
        }

    }

    async verifyCostSection(projectTitle: string, projectDesignation: string, projectRole: string, projectInvolvement: string,
        salaryInBillingCurrency: string, fileName: string) {

        expect(await this.txtName.textContent()).toEqual(projectTitle)
        expect(await this.txtProjectDesignation.textContent()).toEqual(projectDesignation)
        expect(await this.txtProjectRole.textContent()).toEqual(projectRole)

        let actualProjectInvolment = await this.txtProjectInvolvement.textContent()
        if (actualProjectInvolment) {
            actualProjectInvolment = this.extractNumericValues(actualProjectInvolment)
        }
        expect(Number(projectInvolvement)).toEqual(Number(actualProjectInvolment))


        let actualsalaryInBillingCurrency = await this.txtSalaryInBillingCurrency.textContent()
        if (actualsalaryInBillingCurrency) {
            actualsalaryInBillingCurrency = this.extractNumericValues(actualsalaryInBillingCurrency)
        }
        console.log("actualsalaryInBillingCurrency:", actualsalaryInBillingCurrency)
        expect(Number(salaryInBillingCurrency)).toEqual(Number(actualsalaryInBillingCurrency))


        let actualMonthlySalary = await this.txtMonthlySalary.textContent()
        if (actualMonthlySalary) {
            actualMonthlySalary = this.extractNumericValues(actualMonthlySalary)
        }
        expect(Number(salaryInBillingCurrency)).toEqual(Number(actualMonthlySalary))

        let actualEstimatedCost = await this.txtEstimatedCost.textContent()
        if (actualEstimatedCost) {
            actualEstimatedCost = this.extractNumericValues(actualEstimatedCost)
        }

        expect(Number(salaryInBillingCurrency)).toEqual(Number(actualEstimatedCost))
        expect(await this.fileUploaded.textContent()).toContain(fileName)
    }

    async verifyDeclareSection(criminalCheck: string, civilCheck: string, insolvencyCheck: string, projIncentivesCheck: string,
        otherIncentivesCheck: string, projCommenceCheck: string, relatedPartyCheck: string, debarmentCheck: string, acknowledge: string) {

        expect(await this.txtCriminalCheck.textContent()).toEqual(criminalCheck)
        expect(await this.txtCivilProceedingCheck.textContent()).toEqual(civilCheck)
        expect(await this.txtInsolvencyCheck.textContent()).toEqual(insolvencyCheck)
        expect(await this.txtProjectIncentivesCheck.textContent()).toEqual(projIncentivesCheck)
        expect(await this.txtOtherIncentivesCheck.textContent()).toEqual(otherIncentivesCheck)
        expect(await this.txtProjectCommenceCheck.textContent()).toEqual(projCommenceCheck)
        expect(await this.txtRelatedPartyCheck.textContent()).toEqual(relatedPartyCheck)
        expect(await this.txtDebarmentCheck.textContent()).toEqual(debarmentCheck)
        expect(await this.txtConsentAndAcknowledge.textContent()).toEqual(acknowledge)
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

    async getReferenceId() {
        const referenceId = await this.lblRefId.textContent()

        if (!referenceId || referenceId.trim() === '') {
            throw new Error('Reference ID is not available or empty.');
        }
        return referenceId;
    }

}