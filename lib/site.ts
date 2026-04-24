export const siteConfig = {
  name: 'Cuanto Cobrar Landing Page',
  shortName: 'Landing Page',
  title: 'Calculadora para cobrar una landing page',
  description:
    'Calcula cuanto cobrar por una landing page a partir de tu objetivo neto, tus costes fijos, tus horas facturables, las secciones, integraciones, revisiones y una reserva fiscal orientativa.',
  locale: 'es_ES',
  keywords: [
    'cuanto cobrar landing page',
    'precio landing page freelance',
    'calculadora landing page',
    'cuanto cobrar por una landing page',
    'presupuesto landing page',
    'precio pagina de aterrizaje freelance',
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3004',
  ownerName: 'Equipo de Cuanto Cobrar Landing Page',
  contactEmail: 'hola@cuantocobrarlandingpage.es',
  country: 'Espana',
  themeColor: '#145da0',
  backgroundColor: '#f6f8fb',
} as const;

export function getSiteUrl() {
  return new URL(siteConfig.url);
}
