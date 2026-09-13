import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('focused calculator landing', () => {
  it('uses the photographic hero and the compact calculator-first structure', () => {
    const page = readFileSync(join(process.cwd(), 'app/page.tsx'), 'utf8');
    const styles = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8');

    expect(page).toContain('className="quote-landing"');
    expect(page).toContain('src="/images/landing-page-quote-hero.webp"');
    expect(page).toContain('quote-calculator-shell');
    expect(page).toContain('className="quote-mini-strip"');
    expect(page).not.toContain('<FAQ />');
    expect(styles).toMatch(/\.quote-hero\s*{[^}]*min-height:\s*64svh/s);
    expect(styles).toMatch(/\.quote-calculator-shell\s*{[^}]*grid-template-columns:/s);
  });
});
