/**
 * Simple Node.js script to convert the HTML template to PDF
 * 
 * Requirements:
 * npm install puppeteer
 * 
 * Usage:
 * node convert-to-pdf.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function convertHtmlToPdf() {
  console.log('🚀 Starting HTML to PDF conversion...');
  
  try {
    // Launch headless browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });
    
    console.log('✅ Browser launched');
    
    const page = await browser.newPage();
    
    // Read HTML file
    const htmlPath = path.join(__dirname, 'sample-business-doc.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    console.log('✅ HTML file loaded');
    
    // Set content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    const pdfPath = path.join(__dirname, 'sample-business-doc.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px'
      }
    });
    
    console.log('✅ PDF generated successfully!');
    console.log(`📄 Output: ${pdfPath}`);
    
    await browser.close();
    
    console.log('🎉 Conversion complete!');
    
  } catch (error) {
    console.error('❌ Error during conversion:', error);
    process.exit(1);
  }
}

// Run the conversion
convertHtmlToPdf();
