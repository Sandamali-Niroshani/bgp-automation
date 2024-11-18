import { Browser, test, Page, BrowserContext } from '@playwright/test'
import { PageManager } from '../pages/PageManager'
import testData from '../resources/testData/dataTS003.json'
import accountTestData from '../resources/testData/accountData.json'
import commonTestData from '../resources/testData/commonData.json'

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ playwright }) => {
  // Launch the browser once
  browser = await playwright.chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});


/**
 * This is to test Eligibility Section Criteria Validation Warning Message and Verify Open FAQ Link
 */
test.describe('Eligibility Criteria Validation', () => {
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


  test('Verify warning message when answering "No" and verify open FAQ link', async () => {
    await pm.getEligibility().verifyAnsweringNoForQuestionsAndOpenFAQ(
      testData.eligibilityInfo.warningMsg
    )
  })

})

test.afterAll(async () => {
  // Close the browser after all tests
  await browser.close();
});

