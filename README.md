# Trumio Playwright Automation Framework

This repository contains a **robust UI and API automation framework** built with **Playwright (JavaScript/TypeScript)**. It demonstrates end-to-end automation for the **OrangeHRM Demo application** and the **Swagger Pet Store API**, following best practices in maintainable test design, Page Object Model (POM), and CI/CD integration.

> ⚠️ **Note:** All UI and API tests are implemented. Some tests may fail due to unstable selectors or API responses, but the framework, structure, and test logic are complete.

---

## Key Highlights

- **UI Automation**: Page Object Model, positive & negative scenarios, detailed logs, HTML reports.
- **API Automation**: CRUD operations for Pet & Store endpoints, response assertions, error handling, and reporting.
- **CI/CD Integration**: Automated GitHub Actions workflow with headless test execution and report artifacts.
- **Modular Structure**: Separate folders for **UI** and **API** tests, with JSON-based test data management.

---

## Assessment Coverage

### OrangeHRM – UI Automation

- **Login & Logout workflows** (validations & error scenarios)
- **Employee Management** (PIM module):
  - Add, search, edit, and delete employees
  - Filter verification by name, ID, and job title
  - Validate success/error messages

### Swagger Pet Store – API Automation

- **Pet Endpoints**: Add, update, find, delete pet
- **Store Endpoints**: Place order, find order by ID, delete order

---

## Framework Features

- **Page Object Model (POM)** for clean, maintainable UI tests
- **JSON test data management** for reusability
- **Positive & negative test scenarios** coverage
- **Error handling** and detailed logs
- **HTML reports** for easy result review
- **GitHub Actions** CI/CD workflow with test artifact uploads

---

## Project Structure

```
├── tests/
│   ├── ui/               # UI test files
│   └── api/              # API test files
├── pages/                # Page Object Model classes
├── test-data/            # JSON test data files
├── playwright.config.js  # Playwright configuration
├── package.json          # Dependencies
├── .github/workflows/    # CI/CD workflow
└── README.md             # Project documentation
```

---

## Setup Instructions

```bash
git clone <your-repo-link>
cd trumio-playwright-framework
npm ci
npx playwright install --with-deps
```

Run **UI + API tests** locally:

```bash
npx playwright test
```

View **HTML test reports**:

```bash
npx playwright show-report
```

---

## Skills Demonstrated

- **Playwright** (UI & API automation)
- **JavaScript/TypeScript**
- **Page Object Model (POM)** implementation
- **CI/CD** (GitHub Actions)
- **Test Data Management & Logging**
- **HTML Test Reporting**
- **QA Best Practices**

---

## Next Steps / Future Improvements

- Extend coverage to additional OrangeHRM modules
- Implement **data-driven testing** for API endpoints
- Enable **parallel test execution** for faster runs
- Integrate **Slack/Email notifications** for CI/CD reports
