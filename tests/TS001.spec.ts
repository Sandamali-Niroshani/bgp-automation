import { Browser, test, Page, BrowserContext } from '@playwright/test'
import { PageManager } from '../pages/PageManager'
import testData from '../resources/testData/dataTS001.json'
import accountTestData from '../resources/testData/accountData.json'
import commonTestData from '../resources/testData/commonData.json'

let browser: Browser;
let context: BrowserContext;
let page: Page;
let referenceId: string;

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

/**
 * This is to test the end to end flow of submitting a new grant form
 */
test.describe('Submit new grant form', () => {
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
    const testDataGrantActivity = commonTestData.grantActivityInfo;

    await pm.navigateToMyGrant().clickNewGrant()
    await pm.getGrantPicker().applyForGrant(
      testDataGrantActivity.sector,
      testDataGrantActivity.developmentArea,
      testDataGrantActivity.functionalArea
    )
    await pm.getGrantActions().clickProceed()
  })

  test('Input Eligibility Section', async () => {
    await pm.getEligibility().fillEligibilitySection()
    await pm.getEligibility().clickSave()
    await pm.getEligibility().navigateIntoContactDetails()
  })

  test('Input Contact Details Section', async () => {
    const testDataContactInfo = testData.contactDetails;

    await pm.getContactDetails().fillMainContactPersonSection(
      testDataContactInfo.mainContactPerson.name,
      testDataContactInfo.mainContactPerson.designation,
      testDataContactInfo.mainContactPerson.contact,
    );

    await pm.getContactDetails().fillMaillingAddressSection(
      testDataContactInfo.mailingAddress.postalCode,
      testDataContactInfo.mailingAddress.block,
      testDataContactInfo.mailingAddress.street,
      testDataContactInfo.mailingAddress.unitNumber,
      testDataContactInfo.mailingAddress.level,
      testDataContactInfo.mailingAddress.building
    );

    await pm.getContactDetails().fillOfferAddressSection(
      testDataContactInfo.offerAddress.name,
      testDataContactInfo.offerAddress.designation
    );

    await pm.getContactDetails().clickSave();
    await pm.getContactDetails().navigateIntoProposal();
  })

  test('Input Proposal Section', async () => {
    const testDataProposalInfo = testData.proposal;

    await pm.getProposal().fillProposalSection(
      testDataProposalInfo.projectName,
      testDataProposalInfo.startDateAddDay,
      testDataProposalInfo.endDateAddDay,
      testDataProposalInfo.objective,
      testDataProposalInfo.marketEntryStrategy,
      testDataProposalInfo.targetMarket,
      testDataProposalInfo.expandingOutside
    );

    await pm.getProposal().clickSave();
    await pm.getProposal().navigateIntoBusinessImpact();

  })

  test('Input Business Impact Section', async () => {
    const testDataBusinessImpactInfo = testData.businessImpact;

    await pm.getBusinessImpact().fillBusinessImpactSection(
      testDataBusinessImpactInfo.currentFYAddDay,
      testDataBusinessImpactInfo.overseasSales,
      testDataBusinessImpactInfo.overseasInvestments,
      testDataBusinessImpactInfo.reasoning,
      testDataBusinessImpactInfo.otherDetails
    );

    await pm.getBusinessImpact().clickSave();
    await pm.getBusinessImpact().navigateIntoCost();
  })


  test('Input Cost Section', async () => {
    const testDatCostInfo = testData.costSection;

    await pm.getCost().fillSalarySection(
      testDatCostInfo.salaryDetails.name,
      testDatCostInfo.salaryDetails.designation,
      testDatCostInfo.salaryDetails.roleDescription,
      testDatCostInfo.salaryDetails.duration,
      testDatCostInfo.salaryDetails.salary,
      testDatCostInfo.salaryDetails.document,
      commonTestData.costInfo.fileDirectory
    );

    await pm.getCost().clickSave();
    await pm.getCost().navigateIntoDeclareAndReview();
  })


  test('Declare & Acknowledge Form', async () => {
    const testDatDeclarationsInfo = testData.declarations;

    await pm.getDeclarePage().fillDeclareSection(
      testDatDeclarationsInfo.criminalLiability,
      testDatDeclarationsInfo.civilCheck,
      testDatDeclarationsInfo.insolvencyCheck,
      testDatDeclarationsInfo.projIncentivesCheck,
      testDatDeclarationsInfo.otherIncentivesCheck,
      testDatDeclarationsInfo.projCommenceCheck,
      testDatDeclarationsInfo.relatedPartyCheck,
      testDatDeclarationsInfo.debarmentCheck,
    );

    await pm.getDeclarePage().applicantAcknowledgement();
    await pm.getDeclarePage().clickSave();
    await pm.getDeclarePage().navigateIntoReview();
  })


  test('Review All Section in Form', async () => {
    const testDatEligibilityInfo = testData.eligibility;
    const testDataContactInfo = testData.contactDetails;
    const testDataProposalInfo = testData.proposal;
    const testDataBusinessImpactInfo = testData.businessImpact;
    const testDataCostInfo = testData.costSection;
    const testDatDeclarationsInfo = testData.declarations;

    await pm.getReviewPage().verifyEligibilitySection(
      testDatEligibilityInfo.registeredCheck,
      testDatEligibilityInfo.turnoverCheck,
      testDatEligibilityInfo.localEquityCheck,
      testDatEligibilityInfo.targetMarketCheck,
      testDatEligibilityInfo.startProjectCheck
    )

    await pm.getReviewPage().verifyContactDetailsSection(
      testDataContactInfo.mainContactPerson.name,
      testDataContactInfo.mainContactPerson.designation,
      testDataContactInfo.mainContactPerson.contact,
      testDataContactInfo.mailingAddress.street,
      testDataContactInfo.mailingAddress.postalCode,
      testDataContactInfo.mailingAddress.building,
      testDataContactInfo.offerAddress.name,
      testDataContactInfo.offerAddress.designation
    )

    await pm.getReviewPage().verifyProposalDetailsSection(
      testDataProposalInfo.projectName,
      testDataProposalInfo.marketEntryStrategy,
      testDataProposalInfo.targetMarket,
      testDataProposalInfo.expandingOutside
    )

    await pm.getReviewPage().verifyBusinessImpactSection(
      testDataBusinessImpactInfo.overseasSales,
      testDataBusinessImpactInfo.overseasInvestments,
      testDataBusinessImpactInfo.reasoning,
      testDataBusinessImpactInfo.otherDetails
    )

    await pm.getReviewPage().verifyCostSection(
      testDataCostInfo.salaryDetails.name,
      testDataCostInfo.salaryDetails.designation,
      testDataCostInfo.salaryDetails.roleDescription,
      testDataCostInfo.salaryDetails.duration,
      testDataCostInfo.salaryDetails.salary,
      testDataCostInfo.salaryDetails.document
    )
    await pm.getReviewPage().verifyDeclareSection(
      testDatDeclarationsInfo.criminalLiability,
      testDatDeclarationsInfo.civilCheck,
      testDatDeclarationsInfo.insolvencyCheck,
      testDatDeclarationsInfo.projIncentivesCheck,
      testDatDeclarationsInfo.otherIncentivesCheck,
      testDatDeclarationsInfo.projCommenceCheck,
      testDatDeclarationsInfo.relatedPartyCheck,
      testDatDeclarationsInfo.debarmentCheck,
      testDatDeclarationsInfo.acknowledgement
    )
  }
  )

  test('Submit Business Grant Form', async () => {
    const testDatSubmitInfo = testData.submitInfo;

    await pm.getReviewPage().finalAcknowledgementAndSubmitForm()
    await pm.getReviewPage().verifySubmissionDetails(
      testDatSubmitInfo.status,
      testDatSubmitInfo.agencyName
    )
    referenceId = await pm.getReviewPage().getReferenceId()
  })


  test('Verify the Form in Processing Tab', async () => {
    const testDatSubmitInfo = testData.submitInfo;

    await pm.getMenu().navigateIntoMyGrantPage()
    await pm.navigateToMyGrant().verifyFormInProcessingTab(
      referenceId,
      testDatSubmitInfo.grantType,
      testDatSubmitInfo.agencyName,
      testData.proposal.projectName
    )
  })


});





