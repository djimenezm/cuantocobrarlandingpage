import Link from 'next/link';
import { siteConfig } from '@/lib/site';

const footerGroups = [
  {
    title: 'Calcular',
    links: [
      { href: '/#calculadora', label: 'Calculadora' },
      { href: '/precio-landing-page-freelance', label: 'Guía de precios' },
      { href: '/cuanto-cobrar-landing-page-google-ads', label: 'Precio para Google Ads' },
    ],
  },
  {
    title: 'Preparar',
    links: [
      { href: '/ejemplo-presupuesto-landing-page', label: 'Ejemplo de presupuesto' },
      { href: '/estructura-landing-page-que-convierte', label: 'Estructura que convierte' },
      { href: '/que-incluye-una-landing-page', label: 'Qué incluye' },
      { href: '/landing-page-vs-pagina-web', label: 'Landing vs. web' },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-main">
          <div className="footer-brand-block">
            <Link href="/" className="footer-brand">
              Cuánto Cobrar
            </Link>
            <p>Calcula una landing con más margen y menos dudas antes de enviar presupuesto.</p>
            <p className="footer-contact-row">
              <a className="footer-contact-link" href={`mailto:${siteConfig.contactEmail}`}>
                Contacto: {siteConfig.contactEmail}
              </a>
            </p>
          </div>

          <nav className="footer-nav" aria-label="Enlaces del pie de página">
            {footerGroups.map((group) => (
              <div className="footer-group" key={group.title}>
                <p className="footer-group-title">{group.title}</p>
                {group.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="footer-group">
              <p className="footer-group-title">Herramientas</p>
              <a href="https://www.cuantofacturar.es?utm_source=cuantocobrarlandingpage&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Cuánto facturar
              </a>
              <a href="https://www.cuantopresupuestar.es?utm_source=cuantocobrarlandingpage&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Cuánto presupuestar
              </a>
              <a href="https://www.mantenimientowebmensual.es?utm_source=cuantocobrarlandingpage&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
                Mantenimiento web
              </a>
              <a href="https://www.paneldeherramientas.es/precios-freelance?utm_source=cuantocobrarlandingpage&utm_medium=ecosystem-footer&utm_campaign=pricing_hub">
                Precios freelance
              </a>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal-copy">
            <p>
              Copyright {new Date().getFullYear()} {siteConfig.name} · Titular:{' '}
              {siteConfig.ownerName}
            </p>
            <p>Herramienta orientativa. No constituye asesoramiento fiscal ni legal.</p>
          </div>
          <nav aria-label="Enlaces legales">
            <Link href="/aviso-legal">Aviso legal</Link>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/cookies">Cookies</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
