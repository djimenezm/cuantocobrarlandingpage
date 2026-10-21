import { renderToStaticMarkup } from 'react-dom/server';
import Guide, { metadata } from '@/app/precio-landing-page-freelance/page';
import { siteConfig } from '@/lib/site';

describe('landing price guide crawlability', () => {
  it('includes valid structured data in HTML without running client scripts', () => {
    const document = new DOMParser().parseFromString(renderToStaticMarkup(<Guide />), 'text/html');
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent!));

    expect(schemas.map((schema) => schema['@type'])).toEqual(['Article', 'FAQPage']);
    expect(schemas[0].mainEntityOfPage)
      .toBe(new URL('/precio-landing-page-freelance', siteConfig.url).toString());
    expect(schemas[1].mainEntity).toHaveLength(4);
    expect(document.querySelectorAll('h1')).toHaveLength(1);
    expect(metadata.alternates?.canonical).toBe('/precio-landing-page-freelance');
  });
});
