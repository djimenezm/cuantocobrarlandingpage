import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const routes = [
  '/',
  '/ejemplo-presupuesto-landing-page',
  '/estructura-landing-page-que-convierte',
  '/cuanto-cobrar-landing-page-google-ads',
  '/landing-page-para-captar-leads',
  '/landing-page-para-google-ads',
  '/landing-page-vs-pagina-web',
  '/precio-landing-page-freelance',
  '/que-incluye-una-landing-page',
  '/aviso-legal',
  '/privacidad',
  '/cookies',
];

// Only substantive content updates belong here; deployments do not change these dates.
const lastContentUpdates: Record<string, string> = {
  '/': '2026-10-02',
  '/cuanto-cobrar-landing-page-google-ads': '2026-10-02',
  '/landing-page-para-google-ads': '2026-10-02',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    ...(lastContentUpdates[route] ? { lastModified: lastContentUpdates[route] } : {}),
  }));
}
