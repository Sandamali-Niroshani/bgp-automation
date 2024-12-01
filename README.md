# Playwright Test Automation Project

# Special note:

1.  My Grant page waiting time
The My Grants page is taking more than 2 minutes to load. Please note that I have increased the wait time for this project.
For reference, I have attached a video of the My Grants section in the email. 

2. Singpass verification page
I encountered the Singpass verification page one day, and it seems to appear randomly.
Please note that if the Singpass verification page is enabled during script execution, the script will fail, as it is currently not designed to handle the Singpass verification process. This is because automation cannot perform QR code scanning. As an alternative, I can modify the script to handle the manual entry of the Singpass username and password if this page appears. For this solution, I would need the Singpass login credentials to implement and test the changes.
For reference, I have attached a singpass page in the email. 

3. Playwright version
If you encounter any issues while running the project, ensure you are using a compatible Playwright version.
Install the specific versions using:

```bash
npx playwright@1.49.0 install 
``` 

or

```bash
npx playwright@1.48.2 install 
```

I have also shared the pass report separately.
This project can be improved more, but i conclude at this stage.

## Overview

This project is based on Playwright and TypeScript. It includes test cases for the Business Grant Portal.

The project follows the page object design pattern and utilizes an organized folder structure and classes to achieve reusability and maintainability. For handling test data, JSON files are used. Four test cases have been written. Methods are properly divided and created to ensure they cover all scenarios, include necessary verifications, and prioritize reusability without duplications, making it easier to maintain.

This project has potential for further improvements to adopt more best practices.

The project folder structure and the design of test cases are explained in detail under the "Folder Structure" and "Test Cases" sections.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version v22.11.0)  
- **Visual studio code**

## Setup

1. **Clone the repository**:

   git clone https://github.com/Sandamali-Niroshani/bgp-automation.git

2. **Install dependencies**:

   ```bash
    npm install
   ```
3. **Configure Playwright**

    ```bash
     npx playwright install
   ```
## Running Tests

### Execute All Tests

```bash
npx playwright test
```

### Run Specific Tests

```bash
npx playwright test path/to/test-file.spec.ts
(ex: npx playwright test TS001.spec.ts)
```

### Find Report
After exeution find report under playwright-report folder (Attach failure screenshot)

### Generate and View Reports with terminal command

1. Generate the report:

   ```bash
   npx playwright show-report
   ```

2. View the HTML report in the browser.

---

## Debugging Tests

Run tests with the `--debug` flag for step-by-step execution:

```bash
npx playwright test --debug
```

---

## Folder Structure

```
project-root/
├── tests/                 # Include testcases
├── pages/                 # Page Object Models classes and PageManager class(for managing Page Object Models classes)
├── utils/                 # Utility functions/common functions (Include all reusable functions)
├── resources              # testData/uploadFiles (json file for test data)
├── playwright.config.ts   # Playwright configuration
├── package.json           # Project dependencies
├── README.md              # Documentation
└── playwright-report/     # Test reports
```

## TestCases

Testcases are available under tests folder. Create four testcases to cover all scenarios without repeating same scenarios. Each tetscase has corresponding testdata json file following same name convention for testcases and testdata json file. Include two postive scenarios and two negative scenarios.

```bash
TS001: End to end flow of submitting a new business grant form.

       This testcase is planned to cover the end-to-end flow of a user successfully submitting a business grant form, with necessary assertions.
       This cover the following steps:
       * Navigate to business grant portal
       * Apply grant form
       * Fill out all 6 forms, review and submit them successfully
       * Verify reference number under "Processing" tab.
       

TS002: Contact detail section is succeesfully saved with auto populated mailing address and letter of addressee details.

      This testcase is planned to cover the auto-population of data on the contact details page. In TS001, while submitting the form, the user manually enters the email address and addressee details. Therefore, this test case ensures that contact details are successfully saved using the auto-populated feature.


TS003: Eligibility section criteria validation warning message and verify open FAQ link
       
       This testcase is planned to cover the negative scenario of selecting 'No' in the eligibility section. It verifies the warning message, the FAQ link, and ensures that a new tab opens successfully when the FAQ link is clicked.

TS004: Validate the form error redirection and sidebar error number for missing input fields during form submission
       
       It verifies that a validation error is triggered and that the form redirects to the section with the missing details. An error number should appear in the sidebar next to the offending section. 
       This test case is also designed to test all menu navigation. In TS001 (end-to-end test case), the user navigates through the menu using the "Next" button. Here, the approach is to first navigate through all menus and then click the "Review" button to test this negative scenario.

```

---

## Configuration

Customize the `playwright.config.ts` file for your project-specific settings, such as:

- **Test directory:** `testsDir`
- **Timeouts:** `timeout`

Example:

```ts
export default defineConfig({
  timeout: 30000,
});
```

---

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Node.js Download](https://nodejs.org/)
