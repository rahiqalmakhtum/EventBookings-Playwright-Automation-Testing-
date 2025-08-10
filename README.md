# EventBookings Automation Testing with Playwright

[![Node.js](https://img.shields.io/badge/node.js-v18.x-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Website:** [https://www.eventbookings.com/](https://www.eventbookings.com/)

## 📌 Project Overview
This project automates functional and UI testing for the EventBookings web platform using **Playwright**. The goal is to verify critical features such as user signup and login workflows, ensuring reliability and improving testing efficiency through automation.


## 🚀 Key Features
- Comprehensive end-to-end UI testing  
- Validation of core user workflows: signup and login  
- Detailed HTML reports with execution statistics and screenshots  
- Cross-browser support: Chromium, Firefox, WebKit  
- Page Object Model (POM) for reusable and maintainable test code  

## 📂 Test Scenarios

### Signup Flow
- Register with a unique email each time  
- Utilize Gmail aliasing trick (e.g., `testuser+random123@gmail.com`) to create multiple test accounts from a single base email  
- Attempt signup with an already used email alias and verify appropriate error handling  
- Visual confirmation with screenshot on successful signup  

### Login Flow
- Verify login page loads correctly with all form elements visible  
- Negative tests including:  
  - Submitting empty form  
  - Invalid email formats (e.g., `abc.com`)  
  - Wrong password attempts  
  - Non-existing user login attempts  
- Positive test: successful login using valid credentials created during signup  

## 🛠 Tech Stack
- **Playwright** – End-to-end automation framework  
- **JavaScript/TypeScript** – Test scripting language  
- **Node.js** – Runtime environment  
- **HTML Reports** – Visual test execution summaries  

## ▶️ How to Run
```bash
# Install dependencies
npm install

# Execute tests
npx playwright test

# View test report
npx playwright show-report
