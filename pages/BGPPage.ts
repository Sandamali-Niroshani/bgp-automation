import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";


export class BGPPage extends PageBase {
    private btnLogin: Locator = this.page.locator('#login-button')
    private lblManualLogin: Locator = this.page.getByText('Manual Log In')
    private txtEntityId: Locator = this.page.locator('#entityId')
    private txtUserId: Locator = this.page.locator('#userId')
    private txtUserRole: Locator = this.page.locator('#userRole')
    private txtUserFullName: Locator = this.page.locator('#userFullName')
    private btnManualLogin: Locator = this.page.getByRole('button', { name: 'Log In' })
    private lblMyGrants: Locator = this.page.locator('h2', { hasText: 'my Grants' });

    constructor(page: Page) {
        super(page)
    }

    /**
     * This method is to login into Business Grant Portal (BGP)
     * @param entityId entityId
     * @param userId userId
     * @param userRole userRole
     * @param userFullName userFullName
     */
    async loginIntoBGP(entityId: string, userId: string, userRole: string, userFullName: string) {
        await this.btnLogin.click();
        await this.lblManualLogin.waitFor({ state: 'visible' });
        expect(await this.lblManualLogin.isVisible()).toBeTruthy();

        await this.txtEntityId.fill(entityId);
        await this.txtUserId.fill(userId);
        await this.txtUserRole.fill(userRole);
        await this.txtUserFullName.fill(userFullName);

        await this.btnManualLogin.click();

        this.page.waitForLoadState('load')
        await this.lblMyGrants.waitFor({ state: 'visible' });
        expect(await this.lblMyGrants.isVisible()).toBeTruthy();
    }


}