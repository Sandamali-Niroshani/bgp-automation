import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

const PARAMETER = "parameter"
export class BusinessImpact extends PageBase {

    private txtCurrentYear: Locator = this.page.locator('#react-project_impact-fy_end_date_0')
    private txtOverseasSales: Locator = this.page.locator('//input[contains(@id,"react-project_impact-overseas_sales")]')
    private txtOverseasInvestments: Locator = this.page.locator('//input[contains(@id,"react-project_impact-overseas_investments")]')
    private txtRelationaleRemarks: Locator = this.page.locator('#react-project_impact-rationale_remarks')
    private txtBenefitsRemarks: Locator = this.page.locator('#react-project_impact-benefits_remarks')


    private btnSave: Locator = this.page.locator('#save-btn')
    private lblSuccessMsg: Locator = this.page.locator('.growl-title')
    private btnNext: Locator = this.page.locator('#next-btn')
    private lblCostHeading: Locator = this.page.locator('h2', { hasText: 'Provide Details of Costs' })

    constructor(page: Page) {
        super(page)
    }

    private async getDate(noOfDays: number) {
        let date = new Date()
        date.setDate(date.getDate() + noOfDays)
        return date.toISOString().split('T')[0];
    }

    private async formatDate(date: string) {
        const timestamp = Date.parse(date);
        const dateObject = new Date(timestamp);
        const expectedDate = dateObject.getDate().toString();
        const exepctedMont = dateObject.toLocaleString('en-US', { month: 'short' });
        const expectedYear = dateObject.getFullYear().toString();
        return `${expectedDate} ${exepctedMont} ${expectedYear}`;
    }

    async fillBusinessImpactSection(fyEndDate: number, sales: string, investments: string, rationaleRemarks: string,
        benefitsRemarks: string) {

        const fyEndDateString = await this.getDate(fyEndDate);
        const formattedFyEndDate = await this.formatDate(fyEndDateString)
        await this.txtCurrentYear.fill(formattedFyEndDate)

        await this.fillOverseasSales(sales)
        await this.waitForNumberOfSeconds(10)
        await this.fillOverseasInvestments(investments)

        await this.txtRelationaleRemarks.fill(rationaleRemarks)
        await this.txtBenefitsRemarks.fill(benefitsRemarks)
    }

    private async fillOverseasSales(sales: string) {
        const arrOverseasSales = await this.txtOverseasSales.all();
        const arrSales = sales.split(',');
        this.waitForNumberOfSeconds(2)
        console.log("arrSales:",arrSales)

        for (let i = 0; i < arrSales.length; i++) {
           await arrOverseasSales[i].fill(arrSales[i])
        }
    }

    private async fillOverseasInvestments(investments: string) {
        const arrOverseasInvestments = await this.txtOverseasInvestments.all();
        const arrInvestments = investments.split(',');
        await this.waitForNumberOfSeconds(2)
        console.log("arrInvestments:",arrInvestments)

        if (arrOverseasInvestments.length !== arrInvestments.length) {
            throw new Error(`Mismatch in number of input fields and investment values: 
                             fields=${arrOverseasInvestments.length}, 
                             values=${arrInvestments.length}`);
        }
    
        for (let i = 0; i < arrInvestments.length; i++) {
            await arrOverseasInvestments[i].fill(arrInvestments[i])
        }

    }

    async clickSave() {
        await this.btnSave.click()
        expect(await this.lblSuccessMsg.first().textContent()).toEqual('Draft Saved')
    }

    async navigateIntoCost() {
        await this.btnNext.click()
        await this.lblCostHeading.waitFor({ state: 'visible' })
        expect(await this.lblCostHeading.isVisible()).toBeTruthy()
    }

}