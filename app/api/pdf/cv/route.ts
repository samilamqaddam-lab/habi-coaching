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

    const pageUrl = `${baseUrl}/plaquette/cv`;

    console.log('Launching Puppeteer browser for CV...');
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
        defaultViewport: null,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    }

    console.log('Opening new page...');
    const page = await browser.newPage();

    // Set wide viewport to match CV design
    await page.setViewport({
      width: 1000,
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

    // Hide elements that shouldn't appear in PDF
    await page.evaluate(() => {
      // Hide no-print elements (floating buttons, page break indicator)
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
    console.log('Generating CV PDF as single long page...');

    // Convert pixels to mm (assuming 96 DPI: 1 inch = 96px = 25.4mm)
    const pageHeightMm = Math.ceil((bodyHeight / 96) * 25.4) + 20; // +20mm margin
    const pageWidthMm = Math.ceil((1000 / 96) * 25.4);

    const pdfBuffer = await page.pdf({
      width: `${pageWidthMm}mm`,
      height: `${pageHeightMm}mm`,
      printBackground: true,
      margin: {
        top: '5mm',
        right: '5mm',
        bottom: '5mm',
        left: '5mm',
      },
      preferCSSPageSize: false,
    });

    console.log('CV PDF generated successfully');

    // Return the PDF as a downloadable file
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="CV-Hajar-Habi.pdf"',
        'Content-Length': pdfBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating CV PDF:', error);
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
