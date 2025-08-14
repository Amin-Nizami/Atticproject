import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Script to capture HTML baseline for Attic Cleaning page
 */
async function captureAtticCleaningBaseline() {
  console.log('🚀 Starting Attic Cleaning HTML capture...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to the Attic Cleaning page
    const url = 'https://www.atticprojectscompany.com/services/attic-cleaning/';
    console.log(`📄 Fetching: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for page to fully load
    await page.waitForTimeout(3000);
    
    // Get the HTML content
    const htmlContent = await page.content();
    
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Save HTML to attic-cleaning.html
    const filePath = path.join(dataDir, 'attic-cleaning.html');
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    
    console.log(`✅ HTML saved to: ${filePath}`);
    console.log(`📊 HTML length: ${htmlContent.length} characters`);
    
  } catch (error) {
    console.error('❌ Error capturing HTML:', error);
  } finally {
    await browser.close();
  }
}

// Run the script
captureAtticCleaningBaseline()
  .then(() => console.log('🎉 Attic Cleaning HTML capture completed'))
  .catch(console.error);
