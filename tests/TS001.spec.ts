import { Browser, test, Page, BrowserContext } from '@playwright/test'
import { PageManager } from '../pages/PageManager'
import testData from '../resources/testData/dataTS001.json'
import accountTestData from '../resources/testData/accountData.json'

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ playwright }) => {
  // Launch the browser once
  browser = await playwright.chromium.launch({ headless: false }); 
  context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  // Close the browser after all tests
  await browser.close();
});

test.describe('Create new grant', () => {
  let pm: PageManager;

  test.beforeEach(async () => {
    pm = new PageManager(page)
  });

  test('Navigate to application', async () => {
    await pm.navigateToApp().navigateIntoApplication(
      accountTestData.applicationLoginInfo.username,
      accountTestData.applicationLoginInfo.password
    )
  })

  test('Navigate into Business Grant Portal (BGP)', async () => {
    await pm.navigateIntoBGP().loginIntoBGP(
      accountTestData.bgpLoginInfo.entityId,
      accountTestData.bgpLoginInfo.userId,
      accountTestData.bgpLoginInfo.userRole,
      accountTestData.bgpLoginInfo.userFullName
    )
  })

  test('Apply for Business Grant Form', async () => {
    await pm.navigateToMyGrant().clickNewGrant()
    await pm.getGrantPicker().applyForGrant('IT', 'Bring my business overseas or establish a stronger international presence', 'Market Readiness Assistance')
    await pm.getGrantActions().clickProceed()
  })

  test('Input Eligibility Section', async () => {
    await pm.getEligibility().fillEligibilitySection()
    await pm.getEligibility().clickSave()
    await pm.getEligibility().navigateIntoContactDetails()
  })

test('Input Contact Details Section', async () => {
  const contactDetails = testData.contactDetails;

  await pm.getContactDetails().fillMainContactPersonSection(
    contactDetails.mainContactPerson.name,
    contactDetails.mainContactPerson.designation,
    contactDetails.mainContactPerson.contact,
  );

  await pm.getContactDetails().fillMaillingAddressSection(
    contactDetails.mailingAddress.postalCode,
    contactDetails.mailingAddress.block,
    contactDetails.mailingAddress.street,
    contactDetails.mailingAddress.unitNumber,
    contactDetails.mailingAddress.level,
    contactDetails.mailingAddress.building
  );

  await pm.getContactDetails().fillOfferAddressSection(
    contactDetails.offerAddress.name,
    contactDetails.offerAddress.designation,
    contactDetails.offerAddress.email
  );

  await pm.getContactDetails().clickSave();
  await pm.getContactDetails().navigateIntoProposal();
})

test('Input Proposal Section', async () => {
  const proposal = testData.proposal;

  await pm.getProposal().fillProposalSection(
    proposal.projectName,
    proposal.numberOfYears,
    proposal.localShare,
    proposal.objective,
    proposal.marketEntryStrategy,
    proposal.targetMarket,
    proposal.expandingOutside
  );

  await pm.getProposal().clickSave();
  await pm.getProposal().navigateIntoBusinessImpact();

})

test('Input Business Impact Section', async () => {
  const businessImpact = testData.businessImpact;

  await pm.getBusinessImpact().fillBusinessImpactSection(
    businessImpact.numberOfYears,
    businessImpact.overseasSales,
    businessImpact.overseasInvestments,
    businessImpact.reasoning,
    businessImpact.otherDetails
  );

  await pm.getBusinessImpact().clickSave();
  await pm.getBusinessImpact().navigateIntoCost();
})

test('Input Cost Section', async () => {
  const costSection = testData.costSection;

  await pm.getCost().fillSalarySection(
    costSection.salaryDetails.name,
    costSection.salaryDetails.designation,
    costSection.salaryDetails.roleDescription,
    costSection.salaryDetails.duration,
    costSection.salaryDetails.salary,
    costSection.salaryDetails.document
  );

  await pm.getCost().clickSave();
  await pm.getCost().navigateIntoDeclareAndReview();
})

test('Navigate into Declare & Acknowledge', async () => {
  const declarations = testData.declarations;

    await pm.getDeclarePage().fillDeclareSection(
      declarations.criminalLiability,
      declarations.pendingLitigation,
      declarations.insolvency,
      declarations.complianceBreach,
      declarations.termination,
      declarations.misrepresentation,
      declarations.adverseFindings,
      declarations.corruptionViolation
    );

    await pm.getDeclarePage().applicantAcknowledgement();
    await pm.getDeclarePage().clickSave();
    await pm.getDeclarePage().navigateIntoReview();
})


})
