# Playwright Test Automation Project

## Overview

This project is a test automation framework built using [Playwright](https://playwright.dev/). It is designed to provide reliable, scalable, and maintainable tests for web applications across multiple browsers and devices.


## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version v22.11.0)  

## Setup

1. **Clone the repository**:

   git clone https://github.com/Sandamali-Niroshani/bgp-automation.git

2. **Install dependencies**:

   ```bash
    npm install
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
├── pages/                 # Page Object Models
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
TS001: Creating BGP end to end test scenario
```

---

## Configuration

Customize the `playwright.config.ts` file for your project-specific settings, such as:

- **Test directory:** `testsDir`
- **Timeouts:** `timeout`
- **Browsers:** `projects`

Example:

```ts
export default defineConfig({
  timeout: 30000,
});
```

---

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)
- [Node.js Download](https://nodejs.org/)
