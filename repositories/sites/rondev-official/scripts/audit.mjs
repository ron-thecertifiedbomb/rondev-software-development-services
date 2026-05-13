import fs from "fs";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer";

/**
 * Runs a Lighthouse audit and generates a high-quality PDF.
 * @param {string} url - The URL to audit.
 * @param {string} outputName - The name of the resulting PDF file.
 */
async function generateProfessionalPDF(
  url,
  outputName = "rondev-audit-report.pdf",
) {
  console.log(`🚀 Starting RONDEV Lighthouse Audit for: ${url}\n`);

  // 1. Launch headless Chrome for Lighthouse
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

  const options = {
    logLevel: "warn",
    output: "html",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: chrome.port,
  };

  // 2. Run the Lighthouse audit
  console.log("⏳ Running performance metrics (this may take a minute)...");
  const runnerResult = await lighthouse(url, options);

  // 3. Save the HTML report temporarily
  const htmlReport = runnerResult.report;
  const tempHtmlPath = `temp-${Date.now()}.html`;
  fs.writeFileSync(tempHtmlPath, htmlReport);
  console.log("✅ HTML data generated. Compiling into PDF...");

  await chrome.kill();

  // 4. Launch Puppeteer to render the HTML into a clean PDF
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Load the temporary HTML file
  const fileUrl = `file://${process.cwd()}/${tempHtmlPath}`;
  await page.goto(fileUrl, { waitUntil: "networkidle0" });

  // PRO TIP: Emulate 'screen' to keep the dark/light mode UI and colorful gauges.
  // If you don't do this, it defaults to a stripped-down, ugly print stylesheet.
  await page.emulateMediaType("screen");

  // 5. Generate the PDF
  await page.pdf({
    path: outputName,
    format: "A4",
    printBackground: true, // CRITICAL: This ensures background colors and charts render
    margin: {
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px",
    },
  });

  await browser.close();

  // 6. Clean up the temporary HTML file
  fs.unlinkSync(tempHtmlPath);

  console.log(`\n🎉 Success! Professional audit saved as: ${outputName}`);
}

// --- Execution ---
// Set your target URL here (defaulting to the local city portal)
const targetUrl = "https://csjdm.gov.ph";
const outputFile = "CSJDM_Digital_Audit_RONDEV.pdf";

generateProfessionalPDF(targetUrl, outputFile);
