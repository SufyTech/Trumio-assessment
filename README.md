# Trumio Playwright Automation Framework

This repository contains my implementation of a **UI and API automation framework** using **Playwright with JavaScript/TypeScript**. The purpose of this assessment was to design a maintainable and robust testing framework for the **OrangeHRM Demo application** and the **Swagger Pet Store API**, covering end-to-end workflows, CRUD operations, and automated reporting.

The framework emphasizes **reliability, maintainability, and clarity**, using the **Page Object Model (POM)** for UI tests, proper test data management, and automated CI/CD execution via **GitHub Actions**.

---

## Key Learnings

- Structuring UI tests with **Page Object Model (POM)** improves readability and reduces code duplication.
- Separating **UI and API tests** in different folders ensures modularity and easier maintenance.
- Proper **test data management** using JSON files allows testing multiple scenarios efficiently.
- Integration with **GitHub Actions** enables automated CI/CD execution with **headless browser tests**.
- Generating **HTML reports** provides clear visibility of test execution results.

---

## Assessment Coverage

### UI Automation – OrangeHRM

Tested the application: [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/web/index.php/auth/login)

**Test Scenarios Implemented:**

1. Validate **Login and Logout** workflows (positive & negative scenarios).
2. Automate **Employee Management** under PIM module:
   - Create new employee records
   - Verify employee in the list using filters (Name, ID, Job Title)
   - Update employee details
   - Delete employee records
   - Validate **success/error messages** for all operations

**Technical Requirements Implemented:**

- Proper **test data management** via JSON files
- Coverage of **positive and negative scenarios**
- Error handling for critical UI operations
- Detailed **test logs**
- **HTML test reports** for execution visibility

---

### API Automation – Swagger Pet Store

Tested the API: [Swagger Pet Store](https://petstore.swagger.io/)

**Pet Endpoints:**

1. Add a new pet
2. Update an existing pet
3. Find pet by ID
4. Delete a pet

**Store Endpoints:**

1. Place an order for a pet
2. Find purchase order by ID
3. Delete purchase order

**Technical Requirements Implemented:**

- Test data management using JSON
- Positive & negative scenario coverage
- Assertions for **response validation**
- Error handling and logging
- HTML reports for **API test execution**

---

## Framework Features

- **Page Object Model (POM)** for UI tests
- **JSON-based test data management**
- Positive and negative scenario coverage
- **HTML test reports** for easy result analysis
- **Error handling** for all critical operations
- **GitHub Actions** CI/CD workflow with artifact upload
- Separate folder structure for **UI (`tests/ui`)** and **API (`tests/api`)** tests

---

## Project Structure

```
├── tests/
│   ├── ui/
│   │   ├── login.spec.js
│   │   ├── employee.spec.js
│   ├── api/
│   │   ├── pet.spec.js
│   │   └── store.spec.js
├── pages/
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   └── EmployeePage.js
├── test-data/
│   ├── loginData.json
│   └── employeeData.json
├── playwright.config.js
├── package.json
├── .github/
│   └── workflows/playwright.yml
└── README.md
```

---

## Setup Instructions

1. Clone the repository:

```bash
git clone <your-repo-link>
cd trumio-playwright-framework
```

2. Install dependencies:

```bash
npm ci
npx playwright install --with-deps
```

3. Run **UI + API tests** locally:

```bash
npx playwright test
```

4. View **HTML reports**:

```bash
npx playwright show-report
```

---

## CI/CD – GitHub Actions

- Workflow automatically installs dependencies and runs tests in **headless mode**.
- Generates and uploads **HTML reports** as artifacts.
- Reports can be downloaded from: **Actions → Artifacts** in GitHub.

---

## Next Steps / Future Improvements

- Extend test coverage for additional modules in OrangeHRM.
- Add **data-driven testing** for API endpoints using external JSON/CSV files.
- Implement **parallel test execution** for faster test runs.
- Integrate **Slack or Email notifications** for automated test result reporting.

---

## Skills Demonstrated

- **Playwright** & **JavaScript/TypeScript**
- **UI Automation** & **API Automation**
- **Page Object Model (POM)** implementation
- **Test Data Management**
- **CI/CD with GitHub Actions**
- **Test Reporting** (HTML reports)
- **Error Handling** and **QA Best Practices**
