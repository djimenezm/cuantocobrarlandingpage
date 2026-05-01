import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import nextConfig from '@/next.config';

describe('performance config', () => {
  it('inlines tiny global CSS to avoid an extra render-blocking request', () => {
    expect(nextConfig.experimental?.inlineCss).toBe(true);
  });

  it('does not ship Next browser polyfills for legacy browsers', () => {
    const configFile = readFileSync(join(process.cwd(), 'next.config.ts'), 'utf8');
    const noPolyfillsModule = readFileSync(
      join(process.cwd(), 'lib/no-browser-polyfills.ts'),
      'utf8',
    );

    expect(configFile).toContain('next/dist/build/polyfills/polyfill-module');
    expect(configFile).toContain('./lib/no-browser-polyfills.ts');
    expect(noPolyfillsModule.trim()).toBe('export {};');
  });

  it('keeps the homepage lead compact for mobile LCP', () => {
    const homePage = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');
    const globalStyles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');
    const leadMatch = homePage.match(/<p className="lead">([\s\S]*?)<\/p>/);
    const leadText = leadMatch?.[1].replace(/\s+/g, ' ').trim() ?? '';

    expect(leadText.length).toBeLessThanOrEqual(120);
    expect(globalStyles).toMatch(/\.lead\s*{[^}]*font-size:\s*1rem/s);
    expect(globalStyles).toMatch(/\.lead\s*{[^}]*line-height:\s*1\.55/s);
    expect(globalStyles).toMatch(/\.lead\s*{[^}]*max-width:\s*48ch/s);
  });

  it('keeps submit-only code out of the initial calculator bundle', () => {
    const calculatorForm = readFileSync(join(process.cwd(), 'components/CalculatorForm.tsx'), 'utf8');

    expect(calculatorForm).toContain("dynamic(() => import('@/components/ResultCard')");
    expect(calculatorForm).not.toContain("import ResultCard from '@/components/ResultCard'");
    expect(calculatorForm).not.toContain("import { track } from '@vercel/analytics'");
  });

  it('does not rely on color alone for footer links', () => {
    const globalStyles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

    expect(globalStyles).toMatch(/\.site-footer a\s*{[^}]*text-decoration:\s*underline/s);
    expect(globalStyles).toMatch(/\.site-footer a\s*{[^}]*font-weight:\s*700/s);
  });

  it('provides a visible focus state for the generated result card', () => {
    const globalStyles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

    expect(globalStyles).toMatch(/\.result-card:focus\s*{[^}]*outline:\s*3px solid var\(--accent\)/s);
    expect(globalStyles).toMatch(/\.result-card:focus\s*{[^}]*outline-offset:\s*4px/s);
  });

  it('ships a nonce-based CSP for production pages', () => {
    const proxyFile = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8');
    const layoutFile = readFileSync(join(process.cwd(), 'app/layout.tsx'), 'utf8');

    expect(nextConfig.experimental?.sri?.algorithm).toBe('sha256');
    expect(proxyFile).toContain('Content-Security-Policy');
    expect(proxyFile).toContain("script-src 'self' 'nonce-${nonce}' 'strict-dynamic'");
    expect(proxyFile).toContain("style-src 'self' 'unsafe-inline'");
    expect(proxyFile).toContain("object-src 'none'");
    expect(proxyFile).toContain("frame-ancestors 'none'");
    expect(proxyFile).toContain('trusted-types default nextjs nextjs#bundler');
    expect(layoutFile).toContain("export const dynamic = 'force-dynamic'");
    expect(layoutFile).toContain("(await headers()).get('x-nonce')");
  });

  it('sets a preload-ready HSTS policy', () => {
    const proxyFile = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8');

    expect(proxyFile).toContain('Strict-Transport-Security');
    expect(proxyFile).toContain('max-age=63072000; includeSubDomains; preload');
  });

  it('isolates the top-level document from cross-origin popups', () => {
    const proxyFile = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8');

    expect(proxyFile).toContain('Cross-Origin-Opener-Policy');
    expect(proxyFile).toContain("const crossOriginOpenerPolicy = 'same-origin'");
  });

  it('prevents the site from being embedded in frames', () => {
    const proxyFile = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8');

    expect(proxyFile).toContain("frame-ancestors 'none'");
    expect(proxyFile).toContain('X-Frame-Options');
    expect(proxyFile).toContain("const xFrameOptions = 'DENY'");
  });

  it('requires Trusted Types for script sinks', () => {
    const proxyFile = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8');
    const layoutFile = readFileSync(join(process.cwd(), 'app/layout.tsx'), 'utf8');

    expect(proxyFile).toContain("require-trusted-types-for 'script'");
    expect(layoutFile).toContain("window.trustedTypes.createPolicy('default'");
    expect(layoutFile).toContain('blockedHtmlPattern');
    expect(layoutFile).toContain('Blocked unsafe script URL by Trusted Types policy');
    expect(layoutFile).toContain("item['@context'] === 'https://schema.org'");
  });
});
