import { expect, Locator, Page } from "@playwright/test";
import { PageBase } from "../utils/PageBase";

export class ApplyGrant extends PageBase {
    private btnSelectBusinesSector: Locator;
    private lblDevelopmentArea: Locator = this.page.getByText('I need this grant to', { exact: true })

    private btnSelectDevelopmentArea: Locator;
    private lblFunctionalArea: Locator = this.page.getByText('What do you plan to do overseas with this grant?', { exact: true })

    private btnFunctionalArea: Locator;
    private btnApply: Locator = this.page.getByRole('button', { name: 'Apply' })
    private lblGrantActions: Locator = this.page.getByText('Grant Actions', { exact: true })

    private btnGetNewGrant: Locator = this.page.locator('.dashboard-action-title', { hasText: 'Get new grant' })
    private lblBusinessSector: Locator = this.page.getByText('Which sector best describes your business?')

    constructor(page: Page) {
        super(page)
    }

    /**
     * This method is to apply for grant by selecting the sector, development area and functional area
     * @param sector sector to select
     * @param developmentArea development area to select
     * @param functionalArea functional area to select
     */
    async applyForGrant(sector: string, developmentArea: string, functionalArea: string) {
        this.btnSelectBusinesSector = this.page.locator(`.picker-option #${sector}`)
        await this.btnSelectBusinesSector.click()
        expect(await this.lblDevelopmentArea.isVisible()).toBeTruthy()

        this.btnSelectDevelopmentArea = this.page.locator(`.itemname`, { hasText: `${developmentArea}` })
        await this.btnSelectDevelopmentArea.click()
        expect(await this.lblFunctionalArea.isVisible()).toBeTruthy()

        this.btnFunctionalArea = this.page.locator('.itemname', { hasText: `${functionalArea}` })
        await this.btnFunctionalArea.click()
        expect(await this.btnFunctionalArea.isEnabled()).toBeTruthy()

        await this.btnApply.click()
        this.waitForNumberOfSeconds(1)
        expect(await this.lblGrantActions.isVisible()).toBeTruthy()
    }

}