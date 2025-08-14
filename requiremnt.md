1. Project Overview
We are rebuilding our website – https://www.atticprojectscompany.com – to ensure better performance, security, scalability, and ease of maintenance. The current WordPress + Elementor setup has proven too slow, prone to critical errors, and difficult to manage at scale. The new site must be able to handle 100,000+ monthly visitors, meet Core Web Vitals standards, and be developer-friendly but easily editable by non-technical users.
2. Preferred Build Approach
CMS: Headless CMS (e.g., Sanity, Contentful, or WordPress REST API with Gutenberg Block Theme)
Front-End: React with Next.js (preferred), statically generated where possible (SSG/ISR)
Content Editing: CMS fields mapped to flexible components; SEO team must be able to:
Create/edit service pages, blogs, info pages
Customize meta data and slugs
Embed video and structured content
3. Templating Style
Use block-based templating (not traditional monolithic PHP themes).
Code must be stored and versioned in GitHub, using modular, reusable blocks/components.
Templates include all pages in existing Figma mockups, but customizations will be required between pages in each template marked *:
Homepage
Service Page*
Blog Page
Location Page
Contact Page
About Page
Inspection Page
Client Page (Homeowners, HOAs, Real Estate, etc.)*
General (Warranty, Licenses, Insurance, Testimonials, Videos, FAQs, Financing Options)*
4. Performance Requirements
Core Web Vitals: Must pass all metrics (LCP <2.5s, FID <100ms, CLS <0.1)
Lighthouse Score Goals:
Mobile: 90+
Desktop: 95+
No unnecessary third-party plugins or visual page builders
Image optimization (WebP, lazy loading, responsive sizes)
CSS/JS must be tree-shaken and minimized
5. Deployment & DevOps
GitHub workflow with clear deployment pipeline:
Dev → Staging → Production
Use GitHub Actions or similar CI/CD
Automatic backups (daily)
Disaster recovery plan: clear rollback process for staging and production
Core, plugin, and CMS updates must be tested in staging before promotion to production
Please provide a diagram or written explanation of the deployment pipeline
6. Custom Functionality
A. Location-Based Branch Detection
Detect user location via IP (with fallback to manual selector)
Display local branch contact info (city name, phone number) dynamically on:
Header
Location widget
Footer
Contact page
Must be scalable/easy to add or update locations in CMS
Location contact info and map pins must be stored in CMS, not hardcoded.
Display logic should use client-side geo-IP fallback to manual selector (e.g., dropdown or modal).
Setup should support up to 50 locations without major rework.
CCPA compliance for IP tracking (no persistent tracking cookies)


B. Search Functionality
Keyword search that returns:
Matching service pages
Relevant blog posts
Search results should be filterable and load quickly
Bonus: fuzzy search and real-time suggestions
Require full-text search with autocomplete and typo-tolerance (e.g., Algolia, Typesense, or Lunr.js).
Must support search facets/tags for filtering by service category or topic.
Search should return ranked results (service pages prioritized above blogs, etc.).
7. Content Management Guidelines
Easy CMS interface for SEO team to:
Add/edit blog posts
Create new pages using pre-built components
Manage location contact info
Add photos/videos to galleries
CMS should include live preview or instant feedback while editing
All content must be decoupled from presentation (i.e., structured fields, not rich text blobs)
Field labels should be human readable and grouped logically (e.g. “SEO Settings”, “Location Info”)
Provide a README file that:
Maps CMS fields to front-end components
Explains any naming conventions
Provide a short Loom walkthrough video showing how to build or edit a page
Editor permission roles (e.g., Editor vs. Admin) should be defined and tested
8. Testing Requirements
Confirm testing stack includes:
Unit tests (for core logic)
End-to-end testing (e.g., Cypress or Playwright)
Visual regression testing
Accessibility audit (meets WCAG 2.1 AA)
Testing must be run pre-deployment and logged in CI pipeline

9. SEO & Analytics
All pages must support:
Custom meta titles and descriptions
Open Graph tags
Editable schema markup (Service, Organization, Article, Location, BlogPosting). Content editors should be able to adjust structured data via CMS fields.
Integration with:
Google Tag Manager
Google Analytics 4
Search Console
XML sitemap and robots.txt
10. Post-Launch Support
Confirm 30- to 90-day post-launch support for bug fixes
Clarify:
Update strategy for CMS/frontend libraries
Whether a retainer is offered for ongoing maintenance
Expected turnaround time for critical bugs
11. Documentation Required at Handoff
GitHub repo with version history
Deployment and rollback instructions
CMS field-to-component map (README)
Loom video walkthroughs
Support contact or Slack channel (if offered)
Location settings admin guide
Search config guide (keywords, filters)
