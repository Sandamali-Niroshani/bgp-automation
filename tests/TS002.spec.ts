import { Browser, test, Page, BrowserContext } from '@playwright/test'
import { PageManager } from '../pages/PageManager'
import testData from '../resources/testData/dataTS002.json'
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
 * This is to test contact detail section is succeesfully saved with auto populated
 * mailing address and letter of addressee details
 */

test.describe('Save contact section with auto populated details', () => {
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


  test('Navigate into Contact Deatils Section', async () => {
    await pm.getMenu().navigateIntoContactDetails()
  })


  test('Input Contact Details Section Auto populating Mailing Address and Offere Addressee', async () => {
    const testDataContact = testData.contactDetails;

    await pm.getContactDetails().fillMainContactPersonSection(
      testDataContact.mainContactPerson.name,
      testDataContact.mainContactPerson.designation,
      testDataContact.mainContactPerson.contact,
    );

    await pm.getContactDetails().fillMaillingAddressPopulatingData(
      testDataContact.companyMailingAddress.postalCode,
      testDataContact.companyMailingAddress.block,
      testDataContact.companyMailingAddress.street,
      testDataContact.companyMailingAddress.level,
      testDataContact.companyMailingAddress.unitNumber,
      testDataContact.companyMailingAddress.building
    );

    await pm.getContactDetails().fillOfferAddreseePopulatingData(
      testDataContact.mainContactPerson.name,
      testDataContact.mainContactPerson.designation
    );

  })


  test('Save Contact Details Section', async () => {
    await pm.getContactDetails().clickSave();
  });

})


test.afterAll(async () => {
  // Close the browser after all tests
  await browser.close();
});
