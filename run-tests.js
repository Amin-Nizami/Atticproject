#!/usr/bin/env node

/**
 * Test Runner Script for Attic Projects Company Automation Pipeline
 * Provides easy commands to run different test suites
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  log(`\n🚀 ${description}...`, 'cyan');
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    log(`✅ ${description} completed successfully!`, 'green');
  } catch (error) {
    log(`❌ ${description} failed!`, 'red');
    process.exit(1);
  }
}

function showHelp() {
  log('\n🎭 Attic Projects Company - Test Runner', 'bright');
  log('=====================================', 'cyan');
  log('\nAvailable commands:', 'yellow');
  log('  npm run test:all          - Run all tests', 'blue');
  log('  npm run test:homepage     - Run homepage tests only', 'blue');
  log('  npm run test:attic        - Run attic cleaning tests only', 'blue');
  log('  npm run test:ui           - Run tests in UI mode', 'blue');
  log('  npm run test:headed       - Run tests in headed mode', 'blue');
  log('  npm run test:report       - Generate and show test report', 'blue');
  log('  npm run test:chromium     - Run tests in Chromium only', 'blue');
  log('  npm run test:firefox      - Run tests in Firefox only', 'blue');
  log('  npm run test:webkit       - Run tests in WebKit only', 'blue');
  log('  npm run capture:baseline  - Capture new HTML baselines', 'blue');
  log('\nExamples:', 'yellow');
  log('  node run-tests.js all', 'magenta');
  log('  node run-tests.js homepage', 'magenta');
  log('  node run-tests.js ui', 'magenta');
  log('\n');
}

function checkPrerequisites() {
  // Check if Playwright is installed
  if (!fs.existsSync('node_modules/@playwright/test')) {
    log('❌ Playwright not found. Please run: npm install', 'red');
    process.exit(1);
  }

  // Check if browsers are installed
  try {
    execSync('npx playwright --version', { stdio: 'pipe' });
  } catch (error) {
    log('❌ Playwright browsers not installed. Please run: npx playwright install', 'red');
    process.exit(1);
  }
}

function main() {
  const command = process.argv[2];

  if (!command || command === 'help' || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  checkPrerequisites();

  switch (command.toLowerCase()) {
    case 'all':
      runCommand('npx playwright test', 'Running all tests');
      break;
      
//npx playwright test --grep "Homepage" --project=chromium

case 'homepagechromiumworker1':
  runCommand('npx playwright test --grep="Homepage" --project=chromium --workers=1');
  break;

    case 'homepage':
      runCommand('npx playwright test --grep "Homepage"', 'Running homepage tests');
      break;

    case 'attic':
      runCommand('npx playwright test --grep "Attic Cleaning"', 'Running attic cleaning tests');
      break;

    case 'ui':
      runCommand('npx playwright test --ui', 'Running tests in UI mode');
      break;

    case 'headed':
      runCommand('npx playwright test --headed', 'Running tests in headed mode');
      break;

    case 'report':
      runCommand('npx playwright show-report', 'Generating test report');
      break;

    case 'chromium':
      runCommand('npx playwright test --project=chromium', 'Running tests in Chromium');
      break;

    case 'firefox':
      runCommand('npx playwright test --project=firefox', 'Running tests in Firefox');
      break;

    case 'webkit':
      runCommand('npx playwright test --project=webkit', 'Running tests in WebKit');
      break;

    case 'capture':
    case 'baseline':
      runCommand('node capture-attic-cleaning.js', 'Capturing HTML baselines');
      break;

    case 'install':
      runCommand('npx playwright install', 'Installing Playwright browsers');
      break;

    default:
      log(`❌ Unknown command: ${command}`, 'red');
      showHelp();
      process.exit(1);
  }
}

// Run the script
main();
