import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Utility class for capturing and comparing HTML content from web pages
 */
export class HtmlCapture {
  private browser: Browser | null = null;
  private baselineDir: string;
  
  /**
   * Creates a new HtmlCapture instance
   * @param baselineDir Directory where baseline HTML files will be stored
   */
  constructor(baselineDir: string = path.join(process.cwd(), 'baselines', 'html')) {
    this.baselineDir = baselineDir;
    
    // Ensure baseline directory exists
    if (!fs.existsSync(this.baselineDir)) {
      fs.mkdirSync(this.baselineDir, { recursive: true });
    }
  }
  
  /**
   * Initialize the browser instance
   */
  async initialize(): Promise<void> {
    if (!this.browser) {
      this.browser = await chromium.launch();
    }
  }
  
  /**
   * Close the browser instance
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
  
  /**
   * Generate a filename from a URL
   * @param url The URL to convert to a filename
   * @returns A sanitized filename
   */
  private getFilenameFromUrl(url: string): string {
    // Remove protocol and replace special characters
    return url
      .replace(/^https?:\/\//, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase() + '.html';
  }
  
  /**
   * Capture HTML content from a URL and save it as a baseline
   * @param url The URL to capture
   * @returns Path to the saved HTML file
   */
  async captureBaseline(url: string): Promise<string> {
    await this.initialize();
    
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }
    
    const page = await this.browser.newPage();
    
    try {
      // Navigate to the URL and wait for network to be idle
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Wait for main content to be visible
      await page.waitForSelector('h1', { state: 'visible', timeout: 10000 })
        .catch(() => console.log(`No h1 found on ${url}, continuing anyway`));
      
      // Get the HTML content
      const html = await page.content();
      
      // Generate filename and save path
      const filename = this.getFilenameFromUrl(url);
      const savePath = path.join(this.baselineDir, filename);
      
      // Save the HTML content
      fs.writeFileSync(savePath, html);
      
      console.log(`Captured baseline HTML for ${url} -> ${savePath}`);
      return savePath;
    } finally {
      await page.close();
    }
  }
  
  /**
   * Compare current HTML with baseline
   * @param url The URL to compare
   * @returns Object containing comparison result and differences
   */
  async compareWithBaseline(url: string): Promise<{ 
    matches: boolean; 
    differences?: string[];
    currentHtml?: string;
    baselineHtml?: string;
  }> {
    await this.initialize();
    
    if (!this.browser) {
      throw new Error('Browser not initialized');
    }
    
    const filename = this.getFilenameFromUrl(url);
    const baselinePath = path.join(this.baselineDir, filename);
    
    // Check if baseline exists
    if (!fs.existsSync(baselinePath)) {
      return { 
        matches: false, 
        differences: ['Baseline does not exist'] 
      };
    }
    
    // Load baseline HTML
    const baselineHtml = fs.readFileSync(baselinePath, 'utf-8');
    
    // Get current HTML
    const page = await this.browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForSelector('h1', { state: 'visible', timeout: 10000 })
        .catch(() => console.log(`No h1 found on ${url}, continuing anyway`));
      
      const currentHtml = await page.content();
      
      // Simple comparison (can be enhanced with more sophisticated diff logic)
      const matches = baselineHtml === currentHtml;
      
      if (!matches) {
        // For simplicity, we're just returning that they don't match
        // In a real implementation, you might want to use a diff library
        // to provide more detailed information about the differences
        return {
          matches,
          differences: ['HTML content has changed'],
          currentHtml,
          baselineHtml
        };
      }
      
      return { matches };
    } finally {
      await page.close();
    }
  }
  
  /**
   * Batch capture baselines for multiple URLs
   * @param urls Array of URLs to capture
   * @returns Object mapping URLs to their saved file paths
   */
  async batchCaptureBaselines(urls: string[]): Promise<Record<string, string>> {
    const results: Record<string, string> = {};
    
    for (const url of urls) {
      try {
        const path = await this.captureBaseline(url);
        results[url] = path;
      } catch (error) {
        console.error(`Error capturing baseline for ${url}:`, error);
        results[url] = `ERROR: ${error instanceof Error ? error.message : String(error)}`;
      }
    }
    
    return results;
  }
}

/**
 * Example usage:
 * 
 * // Create HTML capture utility
 * const htmlCapture = new HtmlCapture();
 * 
 * // Capture baseline for a single URL
 * await htmlCapture.captureBaseline('https://www.atticprojectscompany.com/');
 * 
 * // Capture baselines for multiple URLs
 * const urls = [
 *   'https://www.atticprojectscompany.com/',
 *   'https://www.atticprojectscompany.com/services',
 *   'https://www.atticprojectscompany.com/contact'
 * ];
 * await htmlCapture.batchCaptureBaselines(urls);
 * 
 * // Compare current HTML with baseline
 * const result = await htmlCapture.compareWithBaseline('https://www.atticprojectscompany.com/');
 * if (result.matches) {
 *   console.log('HTML matches baseline');
 * } else {
 *   console.log('HTML has changed:', result.differences);
 * }
 * 
 * // Close the browser when done
 * await htmlCapture.close();
 */
