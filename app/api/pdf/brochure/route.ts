import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

// For local development, use regular puppeteer
const isDev = process.env.NODE_ENV === 'development';

export async function GET(request: NextRequest) {
  let browser = null;

  try {
    // Get the base URL from the request or environment
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
      (isDev ? 'http://localhost:3000' : `https://${request.headers.get('host')}`);

    const pageUrl = `${baseUrl}/plaquette/offre-entreprise`;

    console.log('Launching Puppeteer browser...');
    console.log('Environment:', isDev ? 'development' : 'production');

    if (isDev) {
      // Local development: use local Chrome
      const puppeteerFull = await import('puppeteer');
      browser = await puppeteerFull.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    } else {
      // Production (Vercel): use @sparticuz/chromium
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    }

    console.log('Opening new page...');
    const page = await browser.newPage();

    // Set wide viewport to match desktop view (1440px is common desktop width)
    await page.setViewport({
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
    });

    console.log(`Navigating to ${pageUrl}...`);
    await page.goto(pageUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait a bit more for fonts and images to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Hide elements that shouldn't appear in PDF (floating buttons, cookie banner, etc.)
    await page.evaluate(() => {
      // Hide no-print elements
      const noPrintElements = document.querySelectorAll('.no-print');
      noPrintElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // Hide all fixed positioned elements (cookie banner, floating buttons)
      const fixedElements = document.querySelectorAll('[class*="fixed"]');
      fixedElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.position === 'fixed') {
          (el as HTMLElement).style.display = 'none';
        }
      });
    });

    // Get the full page height for single long page PDF
    const bodyHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });

    console.log(`Page height: ${bodyHeight}px`);
    console.log('Generating PDF as single long page...');

    // Convert pixels to mm (assuming 96 DPI: 1 inch = 96px = 25.4mm)
    const pageHeightMm = Math.ceil((bodyHeight / 96) * 25.4) + 20; // +20mm margin
    const pageWidthMm = Math.ceil((1440 / 96) * 25.4);

    const pdfBuffer = await page.pdf({
      width: `${pageWidthMm}mm`,
      height: `${pageHeightMm}mm`,
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
      preferCSSPageSize: false,
    });

    console.log('PDF generated successfully');

    // Return the PDF as a downloadable file
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Transcendence-Work-Offre-Entreprise.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
