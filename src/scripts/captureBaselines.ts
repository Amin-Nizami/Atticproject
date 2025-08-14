import { HtmlCapture } from '../utils/htmlCapture';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Script to capture HTML baselines from the Attic Projects Company website
 */
async function captureAtticProjectsBaselines() {
  // Create output directory for HTML baselines
  const baselineDir = path.join(process.cwd(), 'baselines', 'html');
  
  console.log(`Starting HTML baseline capture for Attic Projects Company website`);
  console.log(`Baselines will be saved to: ${baselineDir}`);
  
  // Initialize HTML capture utility
  const htmlCapture = new HtmlCapture(baselineDir);
  
  try {
    // List of pages to capture
    // This is a starter list - you would expand this with all ~60 pages
    const urls = [
      'https://www.atticprojectscompany.com/',
      'https://www.atticprojectscompany.com/services',
      'https://www.atticprojectscompany.com/about',
      'https://www.atticprojectscompany.com/contact',
      'https://www.atticprojectscompany.com/blog',
      // Add more URLs as needed
    ];
    
    console.log(`Capturing baselines for ${urls.length} pages...`);
    
    // Capture baselines for all URLs
    const results = await htmlCapture.batchCaptureBaselines(urls);
    
    // Save results summary to a JSON file
    const summaryPath = path.join(baselineDir, 'capture-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
    
    console.log(`Baseline capture complete. Summary saved to: ${summaryPath}`);
  } catch (error) {
    console.error('Error during baseline capture:', error);
  } finally {
    // Always close the browser when done
    await htmlCapture.close();
  }
}

// Run the script
captureAtticProjectsBaselines()
  .then(() => console.log('Baseline capture script completed'))
  .catch(err => console.error('Script failed:', err));
