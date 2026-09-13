import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          Cuánto Cobrar
        </Link>

        <nav className="nav" aria-label="Navegación principal">
          <Link href="/#calculadora">Calculadora</Link>
          <Link href="/#como-funciona">Qué obtienes</Link>
          <Link href="/ejemplo-presupuesto-landing-page">Ejemplo</Link>
          <Link href="/precio-landing-page-freelance">Guía de precios</Link>
        </nav>
      </div>
    </header>
  );
}
