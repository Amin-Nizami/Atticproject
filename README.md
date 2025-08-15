# 🚀 End-to-End Automation Pipeline for Attic Projects Company

A comprehensive Playwright-based automation testing framework for [atticprojectscompany.com](https://www.atticprojectscompany.com) using TypeScript and the Page Object Model (POM) design pattern.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Test Categories](#test-categories)
- [Configuration](#configuration)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **🎭 Page Object Model (POM)** - Clean separation of page structure and test logic
- **📄 HTML Baseline Comparison** - Automated content regression testing
- **📱 Responsive Design Testing** - Multi-viewport validation
- **🔍 Visual Regression Testing** - Screenshot comparison capabilities
- **♿ Accessibility Testing** - Basic accessibility validation
- **🌐 Cross-browser Compatibility** - Chromium, Firefox, and WebKit support
- **⚡ Performance Monitoring** - Page load time validation
- **🔄 Robust Wait Strategies** - Timeout handling and fallback selectors
- **📊 Comprehensive Reporting** - Detailed test reports with traces and videos
- **🚀 CI/CD Integration** - GitHub Actions workflow included

## 📁 Project Structure

```
d:/website/
├── .github/
│   └── workflows/
│       └── playwright.yml          # GitHub Actions CI/CD pipeline
├── src/
│   ├── pages/                      # Page Object Models
│   │   ├── HomePage.ts             # Homepage POM
│   │   └── AtticCleaningPage.ts    # Attic Cleaning page POM
│   ├── scripts/                    # Utility scripts
│   │   ├── captureBaselines.ts     # HTML baseline capture
│   │   └── captureAtticCleaning.ts # Attic cleaning HTML capture
│   └── utils/
│       └── htmlCapture.ts          # HTML capture utility
├── tests/
│   └── Mian.spec.ts               # Main test suite
├── data/                          # HTML baselines
│   ├── home.html                  # Homepage baseline
│   └── attic-cleaning.html        # Attic cleaning baseline
├── playwright.config.ts           # Playwright configuration
├── package.json                   # Dependencies and scripts
├── test_plan.md                   # Comprehensive test plan
├── Global_Rules.md                # Testing rules and guidelines
└── README.md                      # This file
```

## 🔧 Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Git** (for version control)

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Amin-Nizami/Atticproject.git
   cd Atticproject
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 🎯 Usage

### Running Tests

**Run all tests:**
```bash
npm test
# or
npx playwright test
```

**Run specific test suite:**
```bash
# Homepage tests only
npx playwright test --grep "Homepage"

# Attic Cleaning tests only
npx playwright test --grep "Attic Cleaning"
```

**Run tests in specific browser:**
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

**Run tests with UI mode (interactive):**
```bash
npx playwright test --ui
```

**Run tests in headed mode (visible browser):**
```bash
npx playwright test --headed
```

### Generating Test Reports

```bash
# Generate and open HTML report
npx playwright show-report

# Run tests with trace collection
npx playwright test --trace on
```

### Updating HTML Baselines

**Capture new homepage baseline:**
```bash
node capture-attic-cleaning.js
```

**Capture all baselines:**
```bash
npx ts-node src/scripts/captureBaselines.ts
```

## 🧪 Test Categories

### Homepage Tests (10 categories)
1. **HTML Content Comparison** - Baseline regression testing
2. **Visual Validation** - Element visibility and layout
3. **Responsive Design** - Multi-viewport testing
4. **Typography and Colors** - Font and color scheme validation
5. **Form Functionality** - Contact form testing
6. **Link Validation** - Internal/external link checking
7. **Image Loading** - Image load verification
8. **Performance** - Page load time monitoring
9. **Accessibility** - Basic accessibility checks
10. **Cross-browser Compatibility** - Multi-browser testing

### Attic Cleaning Page Tests (10 categories)
1. **HTML Content Comparison** - Baseline regression testing
2. **Page Content and SEO** - Content and meta validation
3. **Navigation and Header** - Header element verification
4. **Service Content** - Service-specific content validation
5. **Contact Elements and CTAs** - CTA and contact verification
6. **Image Loading** - Service image validation
7. **Responsive Design** - Multi-viewport testing
8. **Footer Elements** - Footer verification
9. **Performance and Accessibility** - Performance and a11y checks
10. **Cross-browser Compatibility** - Multi-browser testing

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

Key settings:
- **Global timeout:** 60 seconds
- **Navigation timeout:** 45 seconds
- **Action timeout:** 15 seconds
- **Expect timeout:** 15 seconds
- **Retries:** 2 (in CI), 0 (locally)
- **Workers:** 1 (CI), 4 (local)

### Browser Projects
- **Chromium** (default)
- **Firefox**
- **WebKit** (Safari)

## 🚀 CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. **Triggers on:**
   - Push to `main`/`master` branch
   - Pull requests
   - Manual dispatch

2. **Pipeline steps:**
   - Install Node.js and dependencies
   - Install Playwright browsers
   - Run all tests
   - Upload test reports and artifacts
   - Generate test summary

3. **Artifacts:**
   - Test reports
   - Screenshots
   - Videos (on failure)
   - Trace files

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/new-page-tests`
3. **Follow the POM pattern** for new pages
4. **Add comprehensive tests** covering all categories
5. **Update documentation** as needed
6. **Submit a pull request**

### Adding New Pages

1. **Create Page Object Model:**
   ```typescript
   // src/pages/NewPage.ts
   export class NewPage {
     constructor(page: Page) {
       // Define selectors and methods
     }
   }
   ```

2. **Add test suite:**
   ```typescript
   // In tests/Mian.spec.ts
   test.describe('New Page - Comprehensive QA Suite', () => {
     // Add 10 test categories following the pattern
   });
   ```

3. **Capture HTML baseline:**
   ```bash
   # Create capture script and save to data/
   ```

## 🔧 Troubleshooting

### Common Issues

**1. Browser Installation Issues:**
```bash
npx playwright install --force
```

**2. Network Timeouts:**
- Check internet connection
- Increase timeout values in `playwright.config.ts`
- Use fallback wait strategies

**3. Selector Issues:**
- Update selectors in Page Object Models
- Add fallback selectors
- Use more robust wait strategies

**4. CI/CD Failures:**
- Check GitHub Actions logs
- Verify environment variables
- Ensure all dependencies are installed

### Debug Mode

**Run single test with debug:**
```bash
npx playwright test --debug --grep "specific test name"
```

**Generate trace for debugging:**
```bash
npx playwright test --trace on
npx playwright show-trace trace.zip
```

## 📊 Performance Benchmarks

- **Page Load Time:** < 10 seconds
- **Test Execution:** ~2-3 minutes for full suite
- **HTML Baseline Comparison:** < 15% variance allowed
- **Image Loading:** 95%+ success rate expected

## 📚 Documentation

- **[Test Plan](test_plan.md)** - Detailed testing strategy
- **[Global Rules](Global_Rules.md)** - Testing guidelines and standards
- **[Requirements](requiremnt.md)** - Project requirements and specifications

## 📞 Support

For issues and questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review existing [GitHub Issues](https://github.com/Amin-Nizami/Atticproject/issues)
3. Create a new issue with detailed description

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using Playwright, TypeScript, and the Page Object Model pattern**
