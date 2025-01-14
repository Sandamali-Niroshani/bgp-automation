import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";
import path from 'path';


export class CostPage extends PageBase {

    private btnSalary: Locator = this.page.locator('#react-project_cost-salaries-accordion-header')
    private btnAddItem: Locator = this.page.locator('#react-project_cost-salaries-add-item')

    private txtName: Locator = this.page.getByPlaceholder('Indicate “TBC” if staff has not been hired yet')
    private txtDesignation: Locator = this.page.getByLabel('Designation')
    private txtRoleInProject: Locator = this.page.getByLabel('Role in Project')
    private txtProjectInvolvement: Locator = this.page.getByLabel('Project Involvement')
    private txtSalaryInBillingCurrency: Locator = this.page.getByLabel('Monthly Salary in Billing Currency')
    private txtMonthlySalry: Locator = this.page.getByLabel('Monthly Salary')
    private txtEstimatedCost: Locator = this.page.locator('//div[contains(@id,"estimated_cost")]')

    private fileInput: Locator = this.page.locator('input[type="file"]');

    private btnSave: Locator = this.page.locator('#save-btn')
    private lblSuccessMsg: Locator = this.page.locator('.growl-title')
    private btnNext: Locator = this.page.locator('#next-btn')
    private lblDeclareReviewHeading: Locator = this.page.locator('h2', { hasText: 'Declare & Acknowledge Terms' })

    constructor(page: Page) {
        super(page)
    }

    async fillSalarySection(name: string, designation: string, role: string, projInvolment: string, salaryInbillingCurrency: string, fileName: string,fileDirectory: string) {

        await this.btnSalary.click()
        await this.btnAddItem.click()
        await this.txtName.fill(name)
        await this.txtDesignation.fill(designation)
        await this.txtRoleInProject.fill(role)
        await this.txtProjectInvolvement.fill(projInvolment)
        await this.txtSalaryInBillingCurrency.fill(salaryInbillingCurrency)

        const populatedMonthlySalary = await this.txtMonthlySalry.inputValue()
        const monthlySalary = this.extractNumericValues(populatedMonthlySalary);
        expect(Number(monthlySalary)).toBe(Number(salaryInbillingCurrency))

        await this.uploadFile(fileDirectory, fileName,this.fileInput)
    }

    async clickSave() {
        await this.btnSave.click()
        expect(await this.lblSuccessMsg.first().textContent()).toEqual('Draft Saved')
    }

    async navigateIntoDeclareAndReview() {
        await this.btnNext.click()
        await this.lblDeclareReviewHeading.waitFor({ state: 'visible' })
        expect(await this.lblDeclareReviewHeading.isVisible()).toBeTruthy()
    }

}