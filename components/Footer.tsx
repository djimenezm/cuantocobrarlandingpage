import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          <p>
            Copyright {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>
            Titular: {siteConfig.ownerName} - Contacto:{' '}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </p>
          <p className="footer-note">
            Herramienta orientativa para cobrar una landing page. No constituye asesoramiento fiscal
            ni legal.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/ejemplo-presupuesto-landing-page">Ejemplo</Link>
          <Link href="/precio-landing-page-freelance">Guía de precios</Link>
          <Link href="/landing-page-vs-pagina-web">Landing vs web</Link>
          <a href="https://www.cuantofacturar.es?utm_source=cuantocobrarlandingpage&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Facturar
          </a>
          <a href="https://www.cuantopresupuestar.es?utm_source=cuantocobrarlandingpage&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Presupuestar
          </a>
          <a href="https://www.mantenimientowebmensual.es?utm_source=cuantocobrarlandingpage&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Mantenimiento web
          </a>
          <a href="https://www.paneldeherramientas.es?utm_source=cuantocobrarlandingpage&utm_medium=ecosystem-footer&utm_campaign=cross_navigation">
            Panel
          </a>
          <Link href="/aviso-legal">Aviso legal</Link>
          <Link href="/privacidad">Privacidad</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
