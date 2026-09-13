import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import CalculatorForm from '@/components/CalculatorForm';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { siteConfig } from '@/lib/site';

const outcomeItems = [
  'Precio mínimo defendible',
  'Precio recomendado',
  'Margen e IVA separados',
] as const;

export default function HomePage() {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    inLanguage: 'es',
    isAccessibleForFree: true,
    description: siteConfig.description,
    url: siteConfig.url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: [
      'Precio mínimo defendible para una landing page',
      'Precio recomendado según alcance y margen',
      'IVA separado del precio del proyecto',
    ],
  };

  return (
    <main id="contenido-principal" className="quote-landing">
      <Script
        id="webapp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      <Header />

      <section className="quote-hero" aria-labelledby="quote-hero-title">
        <Image
          src="/images/landing-page-quote-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="quote-hero-image"
        />
        <div className="quote-hero-scrim" />
        <div className="container quote-hero-content">
          <span className="quote-hero-kicker">Calculadora para freelance y estudios</span>
          <h1 id="quote-hero-title">Cuánto cobrar por una landing page, sin adivinar.</h1>
          <p>
            Define el alcance y descubre el precio que protege tus horas, tus costes y tu margen.
          </p>

          <div className="quote-hero-actions">
            <a href="#calculadora" className="primary-button">
              Calcular mi precio
            </a>
            <a href="#como-funciona" className="quote-ghost-button">
              Ver qué obtengo
            </a>
          </div>
        </div>
      </section>

      <section className="quote-calculator-band" aria-labelledby="quote-calculator-heading">
        <div className="container quote-calculator-shell">
          <div className="quote-calculator-copy">
            <span className="eyebrow">Calcula antes de presupuestar</span>
            <h2 id="quote-calculator-heading">El alcance cambia. Tu precio también.</h2>
            <p>Ajusta proyecto, costes y margen. Obtendrás una cifra lista para defender.</p>
          </div>

          <CalculatorForm />
        </div>
      </section>

      <section
        className="quote-mini-strip"
        id="como-funciona"
        aria-label="Resultado de la calculadora"
      >
        <div className="container quote-mini-strip-inner">
          <strong>Obtienes solo lo necesario:</strong>
          <div>
            {outcomeItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-next-band">
        <div className="container quote-next-panel">
          <div>
            <span className="eyebrow">Después del cálculo</span>
            <h2>Convierte la cifra en un presupuesto que se entienda.</h2>
            <p>Usa el ejemplo para explicar alcance, revisiones y condiciones sin dar rodeos.</p>
          </div>
          <Link href="/ejemplo-presupuesto-landing-page" className="primary-button">
            Ver ejemplo de presupuesto
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
