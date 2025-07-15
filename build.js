#!/usr/bin/env node

/**
 * EC2G Website Build Script
 * 
 * This script validates the website structure and checks for common issues.
 * Run with: node build.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  requiredFiles: [
    'index.html',
    'news.html', 
    'staff.html',
    'videos.html',
    'network.html',
    'style.css',
    'js/data.js',
    'js/utils.js'
  ],
  requiredDirectories: [
    'img',
    'logos',
    'staff',
    'staff/avatars',
    'news'
  ],
  imageExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        log(`✓ ${filePath}`, 'green');
        return true;
      }
    }
    log(`✗ ${filePath} (missing)`, 'red');
    return false;
  } catch (error) {
    log(`✗ ${filePath} (error: ${error.message})`, 'red');
    return false;
  }
}

function checkDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      const stats = fs.statSync(dirPath);
      if (stats.isDirectory()) {
        log(`✓ ${dirPath}/`, 'green');
        return true;
      }
    }
    log(`✗ ${dirPath}/ (missing)`, 'red');
    return false;
  } catch (error) {
    log(`✗ ${dirPath}/ (error: ${error.message})`, 'red');
    return false;
  }
}

function validateHTML(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check for basic HTML structure
    if (!content.includes('<!DOCTYPE html>')) {
      issues.push('Missing DOCTYPE declaration');
    }
    
    if (!content.includes('<html')) {
      issues.push('Missing <html> tag');
    }
    
    if (!content.includes('<head>')) {
      issues.push('Missing <head> tag');
    }
    
    if (!content.includes('<body>')) {
      issues.push('Missing <body> tag');
    }
    
    // Check for viewport meta tag
    if (!content.includes('viewport')) {
      issues.push('Missing viewport meta tag');
    }
    
    // Check for CSS link
    if (!content.includes('style.css')) {
      issues.push('Missing style.css link');
    }
    
    // Check for JavaScript includes
    if (!content.includes('data.js') || !content.includes('utils.js')) {
      issues.push('Missing JavaScript includes');
    }
    
    if (issues.length > 0) {
      log(`⚠ ${filePath} has issues:`, 'yellow');
      issues.forEach(issue => log(`  - ${issue}`, 'yellow'));
      return false;
    } else {
      log(`✓ ${filePath} (valid)`, 'green');
      return true;
    }
  } catch (error) {
    log(`✗ ${filePath} (error reading file: ${error.message})`, 'red');
    return false;
  }
}

function validateCSS(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Check for CSS variables
    if (!content.includes(':root')) {
      issues.push('Missing CSS variables (--brick, etc.)');
    }
    
    // Check for responsive design
    if (!content.includes('@media')) {
      issues.push('Missing responsive design rules');
    }
    
    if (issues.length > 0) {
      log(`⚠ ${filePath} has issues:`, 'yellow');
      issues.forEach(issue => log(`  - ${issue}`, 'yellow'));
      return false;
    } else {
      log(`✓ ${filePath} (valid)`, 'green');
      return true;
    }
  } catch (error) {
    log(`✗ ${filePath} (error reading file: ${error.message})`, 'red');
    return false;
  }
}

function validateJavaScript(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];
    
    // Basic syntax check (very simple)
    if (content.includes('function') && !content.includes('{')) {
      issues.push('Potential syntax error in function definition');
    }
    
    if (issues.length > 0) {
      log(`⚠ ${filePath} has issues:`, 'yellow');
      issues.forEach(issue => log(`  - ${issue}`, 'yellow'));
      return false;
    } else {
      log(`✓ ${filePath} (valid)`, 'green');
      return true;
    }
  } catch (error) {
    log(`✗ ${filePath} (error reading file: ${error.message})`, 'red');
    return false;
  }
}

function main() {
  log('🔍 EC2G Website Build Validation', 'blue');
  log('================================', 'blue');
  
  let allPassed = true;
  
  // Check required files
  log('\n📁 Checking required files:', 'blue');
  config.requiredFiles.forEach(file => {
    if (!checkFile(file)) {
      allPassed = false;
    }
  });
  
  // Check required directories
  log('\n📂 Checking required directories:', 'blue');
  config.requiredDirectories.forEach(dir => {
    if (!checkDirectory(dir)) {
      allPassed = false;
    }
  });
  
  // Validate HTML files
  log('\n🔍 Validating HTML files:', 'blue');
  const htmlFiles = config.requiredFiles.filter(file => file.endsWith('.html'));
  htmlFiles.forEach(file => {
    if (!validateHTML(file)) {
      allPassed = false;
    }
  });
  
  // Validate CSS
  log('\n🎨 Validating CSS:', 'blue');
  if (!validateCSS('style.css')) {
    allPassed = false;
  }
  
  // Validate JavaScript
  log('\n⚡ Validating JavaScript:', 'blue');
  const jsFiles = config.requiredFiles.filter(file => file.endsWith('.js'));
  jsFiles.forEach(file => {
    if (!validateJavaScript(file)) {
      allPassed = false;
    }
  });
  
  // Summary
  log('\n📊 Summary:', 'blue');
  if (allPassed) {
    log('✅ All checks passed! Website is ready for deployment.', 'green');
  } else {
    log('❌ Some checks failed. Please fix the issues above.', 'red');
    process.exit(1);
  }
}

// Run the validation
if (require.main === module) {
  main();
}

module.exports = { main, config }; 