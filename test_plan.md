🧪 End-to-End Automation Test Plan
Website: https://www.atticprojectscompany.com
Objective: Validate all public pages (~60) for functionality, performance, accessibility, SEO, and responsiveness using Playwright.

1. Scope
Automate the validation of:

All public-facing pages (navigation, blogs, services, locations, etc.)
Dynamic content (JS-rendered sections, location detection, search)
Cross-browser & responsive behavior (Chrome, Firefox, Safari, Edge — desktop & mobile)
Core Web Vitals & Lighthouse metrics
Accessibility (WCAG 2.1 AA)
SEO compliance (meta tags, schema, sitemap)
Target: ~60 pages (exact count to be determined via crawl) 

2. Tools & Framework
Test Automation
Playwright (TypeScript)
Browser Support
Chromium, Firefox, WebKit
Performance
Lighthouse CI
(integrated via Playwright)
Accessibility
axe-playwright
Visual Regression
Playwright screenshot comparison
CI/CD
GitHub Actions
Reporting
HTML Reporter, custom CSV/JSON export
3. Test Coverage
✅ Functional Testing
Page load success (HTTP 200)
Presence of <h1> on every page
All internal links are valid (no 404s)
Navigation menus work across breakpoints
Contact form interaction (submit simulation, validation)
Location-based content rendering (header/footer)
Search functionality (if public-facing)
✅ Performance Testing
LCP < 2.5s, FID < 100ms, CLS < 0.1
Lighthouse scores: Mobile ≥90, Desktop ≥95
Image optimization (WebP, lazy loading)
No render-blocking resources
✅ Accessibility
WCAG 2.1 AA compliance
Keyboard navigation
Screen reader support
Color contrast & ARIA labels
Automated scan using axe-playwright
✅ SEO Validation
Meta title & description present and unique
Open Graph tags
Structured data (JSON-LD): Organization, Service, BlogPosting, LocalBusiness
Canonical URLs
XML sitemap and robots.txt validation
✅ Responsive & Cross-Browser
Layout integrity on:
Desktop (1920x1080)
Tablet (768x1024)
Mobile (375x667)
Browser coverage: Chrome, Firefox, Safari, Edge
4. Automation Deliverables
Site Inventory
CSV, JSON
URL, status, title, H1, meta desc, word count, internal/external links, screenshot path
Sitemap
sitemap.json
List of all discovered pages and parent-child relationships
Playwright Scripts
TypeScript
Crawl, capture, validate, and export data
Screenshots
/screenshots/*.png
Full-page screenshots for every URL
HTML Dumps
/html/*.html
Raw HTML for offline analysis
Lighthouse Summary
CSV
Performance, accessibility, SEO scores per page
Failure Log
failures.log
Errors with retry attempts and reasons
README
README.md
Setup, execution, config, assumptions
5. Execution Strategy
Page Discovery
Start from homepage
Recursively follow all internal links (exclude external domains)
Respect robots.txt
Handle JavaScript rendering with page.waitForLoadState('networkidle')
Detect pagination, dynamic menus, and client-side routes
Wait Strategy
ts


1
2
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForSelector('h1', { state: 'visible' });
Rate Limiting
Max 3 concurrent pages
1 second delay between requests (configurable in playwright.config.ts)
Retry Logic
3 retries with exponential backoff on failure
Log all failures to failures.log
6. Playwright Commands (Primary Execution)
All automation is run using native Playwright CLI:

bash


1
2
3
4
5
6
7
8
9
10
11
12
13
14
# Run full test suite
npx playwright test

# Run in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test e2e.crawl.spec.ts

# Debug mode
npx playwright test --debug

# Run on specific browser
npx playwright test --project=chromium
No npm run crawl — pure Playwright standard workflow. 

7. CI/CD Integration (GitHub Actions)
Pipeline:

Checkout code
Install dependencies
Run Playwright tests (E2E, performance, a11y)
Generate reports
Upload artifacts (screenshots, data, logs)
Notify on failure
✅ Runs on every push to main or staging

8. Acceptance Criteria
All public pages discovered and inventoried
No 404s or broken internal links
Every page loads with 200 status and visible H1
Screenshots and HTML saved for each page
Lighthouse and a11y audits completed
Repo runs successfully on a fresh machine
1-page summary report included
9. Assumptions & Constraints
No authentication required for public pages
All content is publicly accessible
No staging environment needed (testing live site)
If IP-based location fails, fallback selector is tested manually
Search is public-facing; no API key required
External links are recorded but not crawled
10. Repo Structure


1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
/attic-automation-suite
├── tests/
│   ├── e2e.crawl.spec.ts         # Main crawler & validator
│   ├── performance.test.ts       # Lighthouse checks
│   ├── accessibility.test.ts     # axe-core integration
│   └── visual.test.ts            # Screenshot comparison
├── data/
│   ├── inventory.csv
│   ├── inventory.json
│   └── lighthouse-summary.csv
├── sitemap.json
├── screenshots/                  # Full-page PNGs
├── html/                         # Raw HTML dumps
├── logs/
│   └── failures.log
├── playwright.config.ts
├── utils/
│   └── crawler.ts
├── package.json
└── README.md
11. Summary Report (1 Page)
Delivered at completion:

Total pages discovered: ___ / ~60
Pages failed to load: ___
Performance outliers (LCP > 2.5s): ___
Critical accessibility issues: ___
SEO gaps (missing meta/schema): ___
Recommendations: Optimize hero images, fix heading hierarchy, improve CLS
⏱️ pending ================================================
📌 Final Notes
This plan is QA-focused, not development.
Uses standard Playwright CLI — no custom scripts.
Fully repeatable, headless, and CI-ready.
Output is structured, auditable, and actionable.
✅ Ready to execute.
Will deliver a complete GitHub-ready automation suite with data, screenshots, and report.