import { expect, Locator, Page } from "@playwright/test";
import { PageManager } from "./PageManager";
import {PageBase} from "../utils/PageBase";

export class LoginPage extends PageBase {
    private formsGroupMenu: Locator = this.page.getByTitle('Forms')
    private formLayoutsMenu: Locator = this.page.getByText('Form Layouts')
    private datepickerMenu: Locator = this.page.getByText('Datepicker')
    private modalContent: Locator = this.page.locator('.modal-content-desktop');
    private usernameField: Locator = this.modalContent.locator('#signInFormUsername');
    private passwordField: Locator = this.modalContent.locator('#signInFormPassword');
    private btnSignIn: Locator = this.modalContent.locator('[value="Sign in"]');
    private imgBGP: Locator = this.page.locator('img[alt="Business Grants Portal"].bgp-logo-desktop');

    constructor(page: Page){
        super(page)
    }

    async navigateIntoApplication(username:string, password:string) {
        await this.page.goto('/')
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.btnSignIn.click()
        await this.waitForNumberOfSeconds(2)
        this.imgBGP.waitFor({ state: 'visible'})
        expect(await this.imgBGP.isVisible()).toBeTruthy()
       
    }

    async formLayoutsPage() {
        await this.formsGroupMenu.click()
        //await this.selectGroupMenuItem('Forms')
        //const formLayoutsMenu = this.page.getByText('Form Layouts')
        await this.formLayoutsMenu.click()
        await this.waitForNumberOfSeconds(2)
    }

    async datePickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.page.getByText('Datepicker').click()
    }

    private async selectGroupMenuItem(groupMenuTitle: string) {
        const groupMenu = this.page.getByTitle(groupMenuTitle);
        const expandStatus = await groupMenu.getAttribute('aria-expanded')
        if (expandStatus == "false") {
            await groupMenu.click()
        }
    }
}