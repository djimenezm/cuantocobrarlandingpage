import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('includes the main indexable routes and excludes redirect-only pages', () => {
    const urls = sitemap().map((entry) => new URL(entry.url));
    const paths = urls.map((url) => url.pathname);

    urls.forEach((url) => expect(url.origin).toBe('https://www.cuantocobrarlandingpage.es'));
    expect(paths).toContain('/');
    expect(paths).toContain('/precio-landing-page-freelance');
    expect(paths).not.toContain('/salida/kit-presupuesto');
    expect(paths).not.toContain('/salida/kit-presupuesto-texto');
  });
});
