import { Page } from '@playwright/test'
import { LoginPage } from './LoginPage'
import { BGPPage } from './BGPPage'
import { MyGrantPage } from './MyGrantPage'
import { ApplyGrant } from './ApplyGrant'
import { GrantActions } from './GrantActions'
import { EligibilityPage } from './EligibilityPage'
import { ContactDetailsPage } from './ContactDetailsPage'
import { ProposalPage } from './ProposalPage'
import { BusinessImpact } from './BusinessImpact'
import { CostPage } from './CostPage'
import {DeclarePage} from './DeclarePage'
import { Menu } from './Menu'

export class PageManager {

    readonly page: Page
    private readonly loginPage: LoginPage
    private readonly bgpPage: BGPPage
    private readonly myGrantPage: MyGrantPage
    private readonly applyGrant: ApplyGrant
    private readonly grantActions: GrantActions
    private readonly eligibilityPage: EligibilityPage
    private readonly contactDetailsPage: ContactDetailsPage
    private readonly proposalPage: ProposalPage
    private readonly businessImpact: BusinessImpact
    private readonly costPage: CostPage
    private readonly declarePage: DeclarePage
    private readonly menu: Menu


    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.bgpPage = new BGPPage(this.page)
        this.myGrantPage = new MyGrantPage(this.page)
        this.applyGrant = new ApplyGrant(this.page)
        this.grantActions = new GrantActions(this.page)
        this.eligibilityPage = new EligibilityPage(this.page)
        this.contactDetailsPage = new ContactDetailsPage(this.page)
        this.proposalPage = new ProposalPage(this.page)
        this.businessImpact = new BusinessImpact(this.page)
        this.costPage = new CostPage(this.page)
        this.declarePage = new DeclarePage(this.page)
        this.menu = new Menu(this.page)

    }

    navigateToApp() {
        return this.loginPage
    }

    navigateIntoBGP() {
        return this.bgpPage
    }

    navigateToMyGrant() {
        return this.myGrantPage
    }

    getGrantPicker() {
        return this.applyGrant
    }

    getGrantActions() {
        return this.grantActions
    }

    getEligibility() {
        return this.eligibilityPage
    }

    getContactDetails() {
        return this.contactDetailsPage
    }

    getProposal() {
        return this.proposalPage
    }

    getBusinessImpact() {
        return this.businessImpact
    }

    getCost() {
        return this.costPage
    }
    
    getDeclarePage(){
        return this.declarePage
    }

    getMenu(){
        return this.menu
    }
}