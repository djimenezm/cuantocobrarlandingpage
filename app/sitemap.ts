import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site';

const routes = [
  '/',
  '/ejemplo-presupuesto-landing-page',
  '/estructura-landing-page-que-convierte',
  '/landing-page-vs-pagina-web',
  '/precio-landing-page-freelance',
  '/que-incluye-una-landing-page',
  '/aviso-legal',
  '/privacidad',
  '/cookies',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified,
  }));
}
