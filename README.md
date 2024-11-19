# Playwright Test Automation Project

# Special note:

The My Grants page is taking more than 2 minutes to load. Please note that I have increased the wait time for this project.
For reference, I will attach a video of the My Grants section. I have also shared the pass report separately.

## Overview

This project is playwright and typescript based project. This include testcases for Buiness Grant Portal. 


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
├── tests/                 # Test files
├── pages/                 # Page Object Models classes and PageManager class(for managing Page Object Models classes)
├── utils/                 # Utility functions/common functions
├── resources              # testData/uploadFiles
├── playwright.config.ts   # Playwright configuration
├── package.json           # Project dependencies
├── README.md              # Documentation
└── playwright-report/     # Test reports
```
## TestCases

Testcases are available under tests folder

```bash
TS001: End to end flow of submitting a new business grant form
TS002: Contact detail section is succeesfully saved with auto populated mailing address and letter of addressee details
TS003: Eligibility section criteria validation warning message and verify open FAQ link
TS004: Validate the form error redirection and sidebar error number for missing input fields form submission

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
