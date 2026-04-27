import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          Cuánto Cobrar Landing Page
        </Link>

        <nav className="nav" aria-label="Navegación principal">
          <Link href="/#calculadora">Calculadora</Link>
          <Link href="/#como-funciona">Cómo funciona</Link>
          <Link href="/precio-landing-page-freelance">Guía de precios</Link>
          <Link href="/estructura-landing-page-que-convierte">Estructura</Link>
          <Link href="/landing-page-para-captar-leads">Captar leads</Link>
          <Link href="/landing-page-para-google-ads">Google Ads</Link>
          <Link href="/ejemplo-presupuesto-landing-page">Ejemplo</Link>
          <Link href="/que-incluye-una-landing-page">Que incluye</Link>
          <Link href="/landing-page-vs-pagina-web">Landing vs web</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
      </div>
    </header>
  );
}
