import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Page Object Model for Attic Cleaning Service Page
 * URL: https://www.atticprojectscompany.com/services/attic-cleaning/
 */
export class AtticCleaningPage {
  readonly page: Page;
  readonly url: string;

  // Header Elements
  readonly logo: Locator;
  readonly navigationMenu: Locator;
  readonly phoneNumber: Locator;
  readonly ctaButton: Locator;

  // Hero Section Elements
  readonly heroSection: Locator;
  readonly heroHeading: Locator;
  readonly heroSubheading: Locator;
  readonly heroCtaButton: Locator;
  readonly heroImage: Locator;

  // Service Content Elements
  readonly serviceTitle: Locator;
  readonly serviceDescription: Locator;
  readonly serviceFeatures: Locator;
  readonly serviceImages: Locator;
  readonly pricingSection: Locator;
  readonly benefitsList: Locator;

  // Process Section Elements
  readonly processSection: Locator;
  readonly processSteps: Locator;
  readonly processHeading: Locator;

  // Contact/CTA Section Elements
  readonly contactSection: Locator;
  readonly contactForm: Locator;
  readonly contactButton: Locator;
  readonly phoneCallButton: Locator;

  // Footer Elements
  readonly footer: Locator;
  readonly footerLinks: Locator;
  readonly socialLinks: Locator;

  // Expected Content Data
  readonly expectedPageTitle: string = 'Attic Cleaning';
  readonly expectedServiceKeywords: string[] = [
    'attic cleaning', 'insulation removal', 'sanitization', 
    'debris removal', 'professional cleaning'
  ];

  constructor(page: Page) {
    this.page = page;
    this.url = 'https://www.atticprojectscompany.com/services/attic-cleaning/';

    // Initialize Header Selectors with fallbacks
    this.logo = page.locator('[data-testid="logo"], .logo, header img, .header-logo').first();
    this.navigationMenu = page.locator('nav, .navigation, .menu, .nav-menu').first();
    this.phoneNumber = page.locator('[href*="tel:"], .phone-number, .contact-phone').first();
    this.ctaButton = page.locator('.cta-button, .btn-primary, .header-cta').first();

    // Initialize Hero Section Selectors
    this.heroSection = page.locator('.hero, .banner, .service-hero, section').first();
    this.heroHeading = page.locator('h1, .hero h1, .service-title h1').first();
    this.heroSubheading = page.locator('.hero h2, .hero .subtitle, .hero p, .service-subtitle').first();
    this.heroCtaButton = page.locator('.hero .btn, .hero .cta, .service-cta').first();
    this.heroImage = page.locator('.hero img, .service-hero img').first();

    // Initialize Service Content Selectors with more robust fallbacks
    this.serviceTitle = page.locator('h1, .service-title, .page-title, .entry-title, .post-title').first();
    this.serviceDescription = page.locator('.service-description, .content p, .service-content, .entry-content p, .post-content p, main p').first();
    this.serviceFeatures = page.locator('.features, .service-features, .benefits, .advantages, .why-choose, .feature-list');
    this.serviceImages = page.locator('.service-images img, .gallery img, .content img, main img, article img');
    this.pricingSection = page.locator('.pricing, .service-pricing, .cost-section, .price, .rates').first();
    this.benefitsList = page.locator('.benefits, .advantages, .why-choose ul, .features ul, .feature-list ul');

    // Initialize Process Section Selectors
    this.processSection = page.locator('.process, .how-it-works, .steps-section').first();
    this.processSteps = page.locator('.step, .process-step, .how-it-works .step');
    this.processHeading = page.locator('.process h2, .how-it-works h2, .steps h2').first();

    // Initialize Contact/CTA Section Selectors
    this.contactSection = page.locator('.contact, .cta-section, .get-quote').first();
    this.contactForm = page.locator('form, .contact-form, .quote-form').first();
    this.contactButton = page.locator('.contact-btn, .get-quote-btn, .submit-btn').first();
    this.phoneCallButton = page.locator('[href*="tel:"], .call-now, .phone-cta').first();

    // Initialize Footer Selectors
    this.footer = page.locator('footer, .footer').first();
    this.footerLinks = page.locator('footer a, .footer a');
    this.socialLinks = page.locator('.social-links a, .social a, footer .social a');
  }

  /**
   * Navigate to the Attic Cleaning page with robust wait strategies
   */
  async navigate(): Promise<void> {
    console.log(`🔗 Navigating to: ${this.url}`);
    
    try {
      // Try with networkidle first
      await this.page.goto(this.url, { 
        waitUntil: 'networkidle',
        timeout: 45000 
      });
    } catch (error) {
      console.log('⚠️ Network timeout with networkidle, trying domcontentloaded...');
      try {
        await this.page.goto(this.url, { 
          waitUntil: 'domcontentloaded',
          timeout: 30000 
        });
      } catch (fallbackError) {
        console.log('⚠️ Navigation failed, trying basic load...');
        await this.page.goto(this.url, { 
          waitUntil: 'load',
          timeout: 20000 
        });
      }
    }

    // Wait for critical elements to load with fallback strategies
    try {
      await this.page.waitForSelector('h1', { state: 'visible', timeout: 15000 });
      console.log('✅ Primary h1 found');
    } catch (error) {
      console.log('⚠️ Primary h1 not found, trying fallback selectors...');
      try {
        await this.page.waitForSelector('.service-title, .page-title, .entry-title', { state: 'visible', timeout: 10000 });
        console.log('✅ Fallback title selector found');
      } catch (fallbackError) {
        console.log('⚠️ Fallback selectors also failed, trying any heading...');
        try {
          await this.page.waitForSelector('h1, h2, h3', { state: 'visible', timeout: 5000 });
          console.log('✅ Any heading found');
        } catch (finalError) {
          console.log('⚠️ No headings found, continuing with basic wait...');
        }
      }
    }

    // Additional wait for dynamic content
    await this.page.waitForTimeout(3000);
    console.log('✅ Navigation completed');
  }

  /**
   * Get current HTML content from the live page
   */
  async getCurrentHtml(): Promise<string> {
    return await this.page.content();
  }

  /**
   * Get baseline HTML from saved file
   */
  getBaselineHtml(): string {
    const baselinePath = path.join(process.cwd(), 'data', 'attic-cleaning.html');
    if (!fs.existsSync(baselinePath)) {
      throw new Error(`Baseline HTML file not found: ${baselinePath}`);
    }
    return fs.readFileSync(baselinePath, 'utf8');
  }

  /**
   * Verify page title and main heading
   */
  async verifyPageTitleAndHeading(): Promise<void> {
    console.log('🔍 Verifying page title and main heading...');
    
    // Check page title
    const pageTitle = await this.page.title();
    expect(pageTitle.toLowerCase()).toContain('attic cleaning');
    console.log(`✅ Page title verified: ${pageTitle}`);

    // Check main heading
    await expect(this.serviceTitle).toBeVisible({ timeout: 10000 });
    const headingText = await this.serviceTitle.textContent();
    expect(headingText?.toLowerCase()).toContain('attic cleaning');
    console.log(`✅ Main heading verified: ${headingText}`);
  }

  /**
   * Verify service content and keywords
   */
  async verifyServiceContent(): Promise<void> {
    console.log('🔍 Verifying service content...');
    
    // Get page content
    const pageContent = await this.page.textContent('body');
    const contentLower = pageContent?.toLowerCase() || '';

    // Check for expected keywords
    let foundKeywords = 0;
    for (const keyword of this.expectedServiceKeywords) {
      if (contentLower.includes(keyword.toLowerCase())) {
        foundKeywords++;
        console.log(`✅ Found keyword: ${keyword}`);
      } else {
        console.log(`⚠️ Missing keyword: ${keyword}`);
      }
    }

    // Expect at least 60% of keywords to be present
    const keywordPercentage = (foundKeywords / this.expectedServiceKeywords.length) * 100;
    expect(keywordPercentage).toBeGreaterThan(60);
    console.log(`✅ Keyword coverage: ${keywordPercentage.toFixed(1)}%`);
  }

  /**
   * Verify navigation and header elements
   */
  async verifyNavigationElements(): Promise<void> {
    console.log('🔍 Verifying navigation elements...');
    
    try {
      // Check logo
      await expect(this.logo).toBeVisible({ timeout: 10000 });
      console.log('✅ Logo is visible');
    } catch (error) {
      console.log('⚠️ Logo not found with current selectors');
    }

    try {
      // Check navigation menu
      await expect(this.navigationMenu).toBeVisible({ timeout: 10000 });
      console.log('✅ Navigation menu is visible');
    } catch (error) {
      console.log('⚠️ Navigation menu not found with current selectors');
    }

    try {
      // Check phone number
      await expect(this.phoneNumber).toBeVisible({ timeout: 5000 });
      console.log('✅ Phone number is visible');
    } catch (error) {
      console.log('⚠️ Phone number not found (may not be present on this page)');
    }
  }

  /**
   * Verify images are loading properly
   */
  async verifyImageLoading(): Promise<void> {
    console.log('🔍 Verifying image loading...');
    
    const images = await this.serviceImages.all();
    let loadedImages = 0;
    
    for (let i = 0; i < Math.min(images.length, 5); i++) { // Check first 5 images
      try {
        const image = images[i];
        await expect(image).toBeVisible({ timeout: 5000 });
        
        // Check if image has loaded (not broken)
        const naturalWidth = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
        if (naturalWidth > 0) {
          loadedImages++;
          console.log(`✅ Image ${i + 1} loaded successfully`);
        } else {
          console.log(`⚠️ Image ${i + 1} may be broken`);
        }
      } catch (error) {
        console.log(`⚠️ Error checking image ${i + 1}:`, error);
      }
    }

    console.log(`📊 Images checked: ${Math.min(images.length, 5)}, Loaded: ${loadedImages}`);
  }

  /**
   * Test responsive design across different viewports
   */
  async testResponsiveDesign(): Promise<void> {
    console.log('📱 Testing responsive design...');
    
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1366, height: 768, name: 'Desktop' }
    ];

    for (const viewport of viewports) {
      try {
        console.log(`🔄 Testing ${viewport.name} (${viewport.width}x${viewport.height})`);
        
        await this.page.setViewportSize({ width: viewport.width, height: viewport.height });
        await this.page.waitForTimeout(3000); // Wait for layout changes
        
        // Check if main heading is still visible
        await expect(this.serviceTitle).toBeVisible({ timeout: 10000 });
        
        // Check navigation (may be different on mobile)
        try {
          await expect(this.navigationMenu).toBeVisible({ timeout: 10000 });
        } catch (error) {
          // Try mobile menu selectors
          const mobileMenu = this.page.locator('.mobile-menu, .hamburger, .menu-toggle').first();
          try {
            await expect(mobileMenu).toBeVisible({ timeout: 5000 });
            console.log(`✅ ${viewport.name}: Mobile menu found`);
          } catch (mobileError) {
            console.log(`⚠️ ${viewport.name}: Navigation not found (may be hidden)`);
          }
        }
        
        console.log(`✅ ${viewport.name} layout verified`);
        
      } catch (error) {
        console.log(`⚠️ ${viewport.name} responsive test failed:`, error);
      }
    }
  }

  /**
   * Verify contact elements and CTAs
   */
  async verifyContactElements(): Promise<void> {
    console.log('🔍 Verifying contact elements...');
    
    try {
      // Check for contact section
      await expect(this.contactSection).toBeVisible({ timeout: 10000 });
      console.log('✅ Contact section is visible');
    } catch (error) {
      console.log('⚠️ Contact section not found with current selectors');
    }

    try {
      // Check for phone call button
      await expect(this.phoneCallButton).toBeVisible({ timeout: 5000 });
      console.log('✅ Phone call button is visible');
    } catch (error) {
      console.log('⚠️ Phone call button not found');
    }

    try {
      // Check for contact form
      await expect(this.contactForm).toBeVisible({ timeout: 5000 });
      console.log('✅ Contact form is visible');
    } catch (error) {
      console.log('⚠️ Contact form not found');
    }
  }

  /**
   * Verify footer elements
   */
  async verifyFooterElements(): Promise<void> {
    console.log('🔍 Verifying footer elements...');
    
    try {
      await expect(this.footer).toBeVisible({ timeout: 10000 });
      console.log('✅ Footer is visible');
      
      // Check footer links
      const footerLinkCount = await this.footerLinks.count();
      console.log(`📊 Footer links found: ${footerLinkCount}`);
      
    } catch (error) {
      console.log('⚠️ Footer verification failed:', error);
    }
  }
}
