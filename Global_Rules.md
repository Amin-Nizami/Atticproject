# Global Rules for Attic Projects Company Website

This document defines the global rules and standards that must be followed throughout the development, testing, and automation processes for the Attic Projects Company website. These rules are derived from the requirements document and test plan to ensure consistency and quality across all aspects of the project.

## 1. Performance Standards

### 1.1 Core Web Vitals
- Largest Contentful Paint (LCP): < 2.5 seconds
- First Input Delay (FID): < 100 milliseconds
- Cumulative Layout Shift (CLS): < 0.1

### 1.2 Lighthouse Scores
- Mobile: ≥ 90
- Desktop: ≥ 95

### 1.3 Asset Optimization
- Images must use WebP format with appropriate fallbacks
- Implement lazy loading for below-the-fold images
- Provide responsive image sizes using srcset
- CSS/JS must be tree-shaken and minimized
- No render-blocking resources

## 2. Accessibility Standards

### 2.1 Compliance Level
- WCAG 2.1 AA compliance required for all pages

### 2.2 Key Requirements
- Proper heading hierarchy (h1 → h6)
- Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility

### 2.3 Testing
- Automated testing with playwright
- Manual verification of critical user journeys

## 3. SEO Standards

### 3.1 Meta Information
- Every page must have unique meta title and description
- Title format: [Page Name] | Attic Projects Company
- Meta description: 120-160 characters, includes primary keyword

### 3.2 Structured Data
- JSON-LD implementation required for:
  - Organization
  - Service
  - BlogPosting
  - LocalBusiness

### 3.3 Technical SEO
- Canonical URLs on all pages
- XML sitemap must be maintained and updated
- robots.txt must be properly configured
- Open Graph tags for social sharing

## 4. Development Standards

### 4.1 Architecture
- Headless CMS (Sanity, Contentful, or WordPress REST API)
- React with Next.js frontend
- Static generation (SSG/ISR) where possible
- Block-based templating with reusable components
- GitHub version control

### 4.2 Code Quality
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Component-based architecture
- Unit tests for core functionality
- No unnecessary third-party plugins

### 4.3 Content Management
- Structured content fields (not rich text blobs)
- Clear separation of content from presentation
- Logical grouping of CMS fields
- Human-readable field labels

## 5. Testing Standards

### 5.1 Test Types
- Unit tests for core logic
- End-to-end tests with Playwright
- Visual regression tests
- Accessibility audits
- Performance monitoring

### 5.2 Test Coverage
- All public pages (~60)
- All critical user journeys
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Responsive design (Mobile, Tablet, Desktop)

### 5.3 Automation Rules
- Page Object Model pattern for test organization
- Maximum 3 concurrent page 
- 1 second delay between requests
- 3 retries with exponential backoff for failed requests
- Respect robots.txt directives
- Wait for network idle and DOM readiness

## 6. DevOps Standards

### 6.1 Deployment Pipeline
- Dev → Staging → Production workflow
- GitHub Actions for CI/CD
- Automated testing before deployment
- Daily backups
- Clear rollback process

### 6.2 Environment Management
- Staging environment must mirror production
- Core, plugin, and CMS updates tested in staging
- No direct edits to production

### 6.3 Monitoring
- Performance monitoring for Core Web Vitals
- Error tracking and logging
- Uptime monitoring

## 7. Content Standards

### 7.1 Page Structure
- Every page must have exactly one H1
- Clear heading hierarchy
- Consistent navigation structure
- Footer with location-specific information

### 7.2 Dynamic Content
- Location-based content must be clearly marked
- Search results must be relevant and ranked appropriately
- Content must be accessible without JavaScript where possible

### 7.3 Forms
- Clear validation messages
- Accessible form controls
- Proper error handling
- Success confirmation

## 8. Responsive Design Standards

### 8.1 Breakpoints
- Mobile: 375px
- Tablet: 768px
- Desktop: 1366px and above

### 8.2 Mobile-First Approach
- Design and develop for mobile first
- Progressive enhancement for larger screens
- No horizontal scrolling on any device

### 8.3 Testing Viewports
- Mobile: 375x667
- Tablet: 768x1024
- Desktop: 1366x768 and 1920x1080

## 9. Documentation Standards

### 9.1 Required Documentation
- README with setup and execution instructions
- CMS field-to-component mapping
- Deployment and rollback procedures
- Location settings admin guide
- Search configuration guide

### 9.2 Code Documentation
- JSDoc comments for functions and components
- README files for major directories
- Clear naming conventions

### 9.3 Test Documentation
- Test plan with scope and coverage
- Test results and reports
- Summary of issues and recommendations

## 10. Data Handling Standards

### 10.1 User Data
- CCPA compliance for IP tracking
- No persistent tracking cookies without consent
- Clear privacy policy

### 10.2 Content Data
- Structured data exports (CSV/JSON)
- Regular content backups
- Version control for content changes

### 10.3 Test Data
- Separate test data from production data
- Fixtures for expected content
- Clear separation of test and production environments

## 11. Reporting Standards

### 11.1 Test Reports
- HTML reports for test results
- CSV/JSON exports for data analysis
- Screenshot evidence for visual issues
- Trace files for debugging

### 11.2 Performance Reports
- Lighthouse scores for all pages
- Core Web Vitals measurements
- Performance regression tracking

### 11.3 Summary Reports
- One-page executive summary
- Key metrics and findings
- Recommendations for improvement

## 12. Maintenance Standards

### 12.1 Update Strategy
- Regular updates for CMS and frontend libraries
- Security patches applied promptly
- Feature updates planned and scheduled

### 12.2 Support
- 30-90 day post-launch support
- Clear process for bug reporting
- Defined SLAs for critical issues

### 12.3 Handoff
- Complete documentation
- Knowledge transfer sessions
- Support contact information
