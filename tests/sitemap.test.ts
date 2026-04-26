import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('includes the main indexable routes and excludes redirect-only pages', () => {
    const paths = sitemap().map((entry) => new URL(entry.url).pathname);

    expect(paths).toContain('/');
    expect(paths).toContain('/precio-landing-page-freelance');
    expect(paths).not.toContain('/salida/kit-presupuesto');
    expect(paths).not.toContain('/salida/kit-presupuesto-texto');
  });
});
