import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Cuánto Cobrar, ir al inicio">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span className="brand-wordmark">
            <strong>Cuánto Cobrar</strong>
            <small>Precios de landing pages</small>
          </span>
        </Link>

        <nav className="nav" aria-label="Navegación principal">
          <Link href="/#como-funciona">Qué obtienes</Link>
          <Link href="/ejemplo-presupuesto-landing-page">Ejemplo</Link>
          <Link className="nav-secondary" href="/precio-landing-page-freelance">Guía de precios</Link>
          <Link className="nav-cta" href="/#calculadora">Calcular ahora <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}
