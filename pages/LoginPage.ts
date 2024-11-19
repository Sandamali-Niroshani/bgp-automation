import { expect, Locator, Page } from "@playwright/test";
import {PageBase} from "../utils/PageBase";

export class LoginPage extends PageBase {
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

}