import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

export class ContactDetailsPage extends PageBase {
    private txtName: Locator = this.page.locator('#react-contact_info-name')
    private txtJobTitle: Locator = this.page.locator('#react-contact_info-designation')
    private txtPhone: Locator = this.page.locator('#react-contact_info-phone')
    private txtEmail: Locator = this.page.locator('#react-contact_info-primary_email')
    private txtPostalCode: Locator = this.page.locator('#react-contact_info-correspondence_address-postal')
    private txtBlockNo: Locator = this.page.locator('input#react-contact_info-correspondence_address-block')
    private txtStreet: Locator = this.page.locator('input#react-contact_info-correspondence_address-street')
    private txtLevel: Locator = this.page.locator('input#react-contact_info-correspondence_address-level')
    private txtUnit: Locator = this.page.locator('input#react-contact_info-correspondence_address-unit')
    private txtBuildingName: Locator = this.page.getByLabel('Building Name')

    private txtOffereeName: Locator = this.page.locator('#react-contact_info-offeree_name')
    private txtOffereeJobTitle: Locator = this.page.locator('#react-contact_info-offeree_designation')
    private txtOffereeJobEmail: Locator = this.page.locator('#react-contact_info-offeree_email')
    private btnSave: Locator = this.page.locator('#save-btn')
    private lblSuccessMsg: Locator = this.page.locator('.growl-title')
    private btnNext: Locator = this.page.locator('#next-btn')
    private lblProposalHeading: Locator = this.page.locator('h2', { hasText: 'Submit Your Proposal' })

    constructor(page: Page) {
        super(page)
    }

    async fillMainContactPersonSection(name: string, jobTitle: string, phone: string, email: string) {
        await this.txtName.fill(name)
        await this.txtJobTitle.fill(jobTitle)
        await this.txtPhone.fill(phone)
        await this.txtEmail.fill(email)
    }

    async fillMaillingAddressSection(postalCode: string, blockNo: string, street: string, level: string, unit: string, buildingName: string) {
        await this.txtPostalCode.fill(postalCode)
        await this.waitForNumberOfSeconds(2)
        const populatedBlockNo = await this.txtBlockNo.inputValue()
        expect(populatedBlockNo).toBe(blockNo)
        const populatedStreet = await this.txtStreet.inputValue()
        expect(populatedStreet).toBe(street)
        await this.txtLevel.fill(level)
        await this.txtUnit.fill(unit)
        await this.txtBuildingName.fill(buildingName)
    }

    async fillOfferAddressSection(name: string, jobTitle: string, email: string) {
        await this.txtOffereeName.fill(name)
        await this.txtOffereeJobTitle.fill(jobTitle)
        await this.txtOffereeJobEmail.fill(email)
    }
   
    async clickSave() {
        await this.btnSave.click()
        expect(await this.lblSuccessMsg.first().textContent()).toEqual('Draft Saved')
    }

    async navigateIntoProposal() {
        await this.btnNext.click()
        await this.lblProposalHeading.waitFor({ state: 'visible' })
        expect(await this.lblProposalHeading.isVisible()).toBeTruthy()
    }

}