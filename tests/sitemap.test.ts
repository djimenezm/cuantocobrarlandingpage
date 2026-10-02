import sitemap from '@/app/sitemap';

describe('sitemap', () => {
  it('only reports documented substantive content updates', () => {
    const updatedRoutes = Object.fromEntries(
      sitemap()
        .filter((entry) => entry.lastModified !== undefined)
        .map((entry) => [new URL(entry.url).pathname, entry.lastModified]),
    );

    expect(updatedRoutes).toEqual({
      '/': '2026-10-02',
      '/cuanto-cobrar-landing-page-google-ads': '2026-10-02',
      '/landing-page-para-google-ads': '2026-10-02',
    });
  });

  it('includes the main indexable routes and excludes redirect-only pages', () => {
    const urls = sitemap().map((entry) => new URL(entry.url));
    const paths = urls.map((url) => url.pathname);

    urls.forEach((url) => expect(url.origin).toBe('https://www.cuantocobrarlandingpage.es'));
    expect(paths).toContain('/');
    expect(paths).toContain('/ejemplo-presupuesto-landing-page');
    expect(paths).toContain('/estructura-landing-page-que-convierte');
    expect(paths).toContain('/cuanto-cobrar-landing-page-google-ads');
    expect(paths).toContain('/landing-page-para-captar-leads');
    expect(paths).toContain('/landing-page-para-google-ads');
    expect(paths).toContain('/landing-page-vs-pagina-web');
    expect(paths).toContain('/precio-landing-page-freelance');
    expect(paths).toContain('/que-incluye-una-landing-page');
    expect(paths).not.toContain('/salida/kit-presupuesto');
    expect(paths).not.toContain('/salida/kit-presupuesto-texto');
  });
});
