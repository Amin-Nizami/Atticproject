import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

/**
 * Environment Configuration Interface
 */
export interface TestConfig {
  baseUrl: string;
  homePageUrl: string;
  atticCleaningPageUrl: string;
  testTimeout: number;
  navigationTimeout: number;
  actionTimeout: number;
  expectTimeout: number;
  defaultBrowser: string;
  headless: boolean;
  viewportWidth: number;
  viewportHeight: number;
}

/**
 * Get configuration from environment variables with defaults
 */
export function getConfig(): TestConfig {
  return {
    baseUrl: process.env.BASE_URL || 'https://www.atticprojectscompany.com',
    homePageUrl: process.env.HOME_PAGE_URL || 'https://www.atticprojectscompany.com/',
    atticCleaningPageUrl: process.env.ATTIC_CLEANING_PAGE_URL || 'https://www.atticprojectscompany.com/services/attic-cleaning/',
    testTimeout: parseInt(process.env.TEST_TIMEOUT || '60000'),
    navigationTimeout: parseInt(process.env.NAVIGATION_TIMEOUT || '45000'),
    actionTimeout: parseInt(process.env.ACTION_TIMEOUT || '15000'),
    expectTimeout: parseInt(process.env.EXPECT_TIMEOUT || '15000'),
    defaultBrowser: process.env.DEFAULT_BROWSER || 'chromium',
    headless: process.env.HEADLESS === 'true',
    viewportWidth: parseInt(process.env.VIEWPORT_WIDTH || '1280'),
    viewportHeight: parseInt(process.env.VIEWPORT_HEIGHT || '720')
  };
}

/**
 * Get specific URL by name
 */
export function getUrl(urlName: keyof Pick<TestConfig, 'baseUrl' | 'homePageUrl' | 'atticCleaningPageUrl'>): string {
  const config = getConfig();
  return config[urlName];
}

/**
 * Validate that all required environment variables are set
 */
export function validateConfig(): void {
  const config = getConfig();
  const requiredFields: (keyof TestConfig)[] = ['baseUrl', 'homePageUrl', 'atticCleaningPageUrl'];
  
  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Missing required environment variable for ${field}`);
    }
  }
}

// Export the configuration instance
export const config = getConfig();
